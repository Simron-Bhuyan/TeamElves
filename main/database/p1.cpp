// Copyright (c) 2015 Vittorio Romeo
// License: AFL 3.0 | https://opensource.org/licenses/AFL-3.0
// http://vittorioromeo.info | vittorio.romeo@outlook.com

#include <memory>
#include "../Other/Other.hpp"

// Let's begin thinking about the design of our example game
// in this code segment.

// We'll first implement the game using a traditional object-oriented
// approach, then we'll reimplement it from scratch, along with
// a simple data-oriented entity component system framework.

// The game we're going to write will be a simple shoot-em-up,
// genre also commonly as "bullet-hell". It will consist in
// a player-controlled spaceship fighting an AI-controlled boss
// shooting bullet patterns that the player will have to dodge.

// We're going to need these entities/classes:
// * Player
// * Boss
// * Bullet
// * PlayerBullet

// Following a traditional object-oriented approach, we're going to
// have a base `GameObject` class with `virtual` `update(FT)` and
// `draw()` methods.

// Let's start by implementing that.

// Our entity architecture will look like this:
// {image: p1_d0}

namespace example
{
    // Manager forward-declaration.
    class Manager;

    // This is the base class of our game hierarchy.
    class GameObject
    {
        friend class Manager;

    private:
        // Memory will be reclaimed from dead objects.
        bool alive{true};

    public:
        virtual ~GameObject() {}

        virtual void update(FT) {}
        virtual void draw(sf::RenderTarget&) {}

        void kill() noexcept { alive = false; }
    };

    // We'll also need some kind of manager class that allows
    // us to quickly deal with collections of `GameObject` instances.
    class Manager
    {
    private:
        // Main container that will manage the memory of the objects.
        std::vector<std::unique_ptr<GameObject>> objects;

    public:
        // Create an object of type `T` and emplace it inside the main
        // container.
        template <typename T, typename... TArgs>
        auto& emplace(TArgs&&... mArgs)
        {
            // `FWD(x)` is a macro that expands to
            // `::std::forward<decltype(x)>(x)`.

            objects.emplace_back(std::make_unique<T>(FWD(mArgs)...));
            return *(objects.back());
        }

        // `refresh()` will reclaim object from dead objects, and
        // remove them from the `objects` vector.
        void refresh()
        {
            // NOTE: container erasure will be generalized in C++17.
            // `std::experimental::erase_if` will result in code similar
            // to the "erase-remove_if" idiom for `std::vector`.

            objects.erase(std::remove_if(std::begin(objects), std::end(objects),
                              [](const auto& uptr)
                              {
                                  return !uptr->alive;
                              }),
                std::end(objects));
        }

        // Update all game objects.
        void update(FT mFT)
        {
            // Indices are used instead of pointers/iterators/for...each
            // to prevent invalidation during memory reallocation, as new
            // objects will be created during game updates.
            for(auto i(0u); i < objects.size(); ++i) objects[i]->update(mFT);
        }

        // Draw all game objects.
        void draw(sf::RenderTarget& mRT)
        {
            for(auto i(0u); i < objects.size(); ++i) objects[i]->draw(mRT);
        }

        auto getObjectCount() const noexcept { return objects.size(); }
    };

    // Let's quickly test our manager class.
    struct TestObject : GameObject
    {
    private:
        float life{100};
        sf::CircleShape shape;

    public:
        void update(FT mFT) override
        {
            life -= mFT;
            shape.setRadius(life);
            shape.setFillColor(sf::Color::Red);

            if(life <= 0) kill();
        }

        void draw(sf::RenderTarget& mRT) override { mRT.draw(shape); }
    };

    struct Game : Boilerplate::TestApp
    {
        // Our game will contain an instance of `Manager`.
        Manager mgr;

        Game(ssvs::GameWindow& mX) : Boilerplate::TestApp{mX}
        {
            onTxtInfoUpdate += [this](auto& oss, FT)
            {
                oss << "Objects: " << mgr.getObjectCount() << "\n";
            };

            mgr.emplace<TestObject>();
        }

        void update(FT mFT) override
        {
            // A single update will consist of both a manager
            // update and refresh.
            mgr.update(mFT);
            mgr.refresh();
        }

        void draw() override { mgr.draw(gameWindow); }
    };
}

int main()
{
    Boilerplate::AppRunner<example::Game>{"ECS", 320, 240};
    return 0;
}// Copyright (c) 2015 Vittorio Romeo
// License: AFL 3.0 | https://opensource.org/licenses/AFL-3.0
// http://vittorioromeo.info | vittorio.romeo@outlook.com

#include <iostream>

// Let's rewrite the code snippet in a more organized manner, using
// comments to make obvious what it is actually happening.

template <typename TF, typename... Ts>
void forArgs(TF&& mFn, Ts&&... mArgs)
{
    // We require a context where variadic parameter expansion can
    // take place, so that we can expand the function call with every
    // passed argument.

    // We can use an `std::initializer_list` to create such context,
    // but any "brace-initializable" container works, like C-style
    // arrays. (Examples: `bool[]`, `int[]`)

    // These contexts guarantee that the arguments will be evaluated
    // in the correct order, unlike a generic variadic lambda, for
    // example.

    return (void)std::initializer_list<int>{
        // Every element of the `initializer_list` is an expression
        // enclosed in round parenthesis.
        (
            // In the parenthesis, the result of the `mFn` function
            // call is followed by the comma operator and an integer
            // (zero in this case).

            // Thanks to the comma operator, the expression evaluates
            // to an (unused) integer, which is accepted by the
            // `initializer_list`.

            mFn(
                // As we're taking the variadic arguments by
                // "forwarding reference", it is important
                // to use `std::forward` to correctly forward
                // their reference types to `mFn`.
                std::forward<Ts>(mArgs)),

            0)...};
}

// Still confused? Everything becomes clearer with an example
// expansion of a `forArgs` call:

/*

// The following `forArgs` call...

forArgs
(
    [](const auto& x){ std::cout << x << " "; },

    "hello",
    1,
    2,
    3
);

// ..roughly expands to...

(void) std::initializer_list<int>
{
    ([](const auto& x){ std::cout << x; }("hello"), 0),
    ([](const auto& x){ std::cout << x; }(1), 0),
    ([](const auto& x){ std::cout << x; }(2), 0),
    ([](const auto& x){ std::cout << x; }(3), 0)
}

// ...which is the same as writing...

std::cout << "hello";
std::cout << 1;
std::cout << 2;
std::cout << 3;

*/

int main()
{
    // Prints "hello123".
    forArgs(
        [](const auto& x)
        {
            std::cout << x;
        },

        "hello", 1, 2, 3);

    std::cout << "\n";
    return 0;
}

// In the next code segment we'll take a look at an example use case.// Copyright (c) 2015 Vittorio Romeo
// License: AFL 3.0 | https://opensource.org/licenses/AFL-3.0
// http://vittorioromeo.info | vittorio.romeo@outlook.com

#include <memory>
#include "../Other/Other.hpp"

// Let's begin thinking about the design of our example game
// in this code segment.

// We'll first implement the game using a traditional object-oriented
// approach, then we'll reimplement it from scratch, along with
// a simple data-oriented entity component system framework.

// The game we're going to write will be a simple shoot-em-up,
// genre also commonly as "bullet-hell". It will consist in
// a player-controlled spaceship fighting an AI-controlled boss
// shooting bullet patterns that the player will have to dodge.

// We're going to need these entities/classes:
// * Player
// * Boss
// * Bullet
// * PlayerBullet

// Following a traditional object-oriented approach, we're going to
// have a base `GameObject` class with `virtual` `update(FT)` and
// `draw()` methods.

// Let's start by implementing that.

// Our entity architecture will look like this:
// {image: p1_d0}

namespace example
{
    // Manager forward-declaration.
    class Manager;

    // This is the base class of our game hierarchy.
    class GameObject
    {
        friend class Manager;

    private:
        // Memory will be reclaimed from dead objects.
        bool alive{true};

    public:
        virtual ~GameObject() {}

        virtual void update(FT) {}
        virtual void draw(sf::RenderTarget&) {}

        void kill() noexcept { alive = false; }
    };

    // We'll also need some kind of manager class that allows
    // us to quickly deal with collections of `GameObject` instances.
    class Manager
    {
    private:
        // Main container that will manage the memory of the objects.
        std::vector<std::unique_ptr<GameObject>> objects;

    public:
        // Create an object of type `T` and emplace it inside the main
        // container.
        template <typename T, typename... TArgs>
        auto& emplace(TArgs&&... mArgs)
        {
            // `FWD(x)` is a macro that expands to
            // `::std::forward<decltype(x)>(x)`.

            objects.emplace_back(std::make_unique<T>(FWD(mArgs)...));
            return *(objects.back());
        }

        // `refresh()` will reclaim object from dead objects, and
        // remove them from the `objects` vector.
        void refresh()
        {
            // NOTE: container erasure will be generalized in C++17.
            // `std::experimental::erase_if` will result in code similar
            // to the "erase-remove_if" idiom for `std::vector`.

            objects.erase(std::remove_if(std::begin(objects), std::end(objects),
                              [](const auto& uptr)
                              {
                                  return !uptr->alive;
                              }),
                std::end(objects));
        }

        // Update all game objects.
        void update(FT mFT)
        {
            // Indices are used instead of pointers/iterators/for...each
            // to prevent invalidation during memory reallocation, as new
            // objects will be created during game updates.
            for(auto i(0u); i < objects.size(); ++i) objects[i]->update(mFT);
        }

        // Draw all game objects.
        void draw(sf::RenderTarget& mRT)
        {
            for(auto i(0u); i < objects.size(); ++i) objects[i]->draw(mRT);
        }

        auto getObjectCount() const noexcept { return objects.size(); }
    };

    // Let's quickly test our manager class.
    struct TestObject : GameObject
    {
    private:
        float life{100};
        sf::CircleShape shape;

    public:
        void update(FT mFT) override
        {
            life -= mFT;
            shape.setRadius(life);
            shape.setFillColor(sf::Color::Red);

            if(life <= 0) kill();
        }

        void draw(sf::RenderTarget& mRT) override { mRT.draw(shape); }
    };

    struct Game : Boilerplate::TestApp
    {
        // Our game will contain an instance of `Manager`.
        Manager mgr;

        Game(ssvs::GameWindow& mX) : Boilerplate::TestApp{mX}
        {
            onTxtInfoUpdate += [this](auto& oss, FT)
            {
                oss << "Objects: " << mgr.getObjectCount() << "\n";
            };

            mgr.emplace<TestObject>();
        }

        void update(FT mFT) override
        {
            // A single update will consist of both a manager
            // update and refresh.
            mgr.update(mFT);
            mgr.refresh();
        }

        void draw() override { mgr.draw(gameWindow); }
    };
}

int main()
{
    Boilerplate::AppRunner<example::Game>{"ECS", 320, 240};
    return 0;
}// Copyright (c) 2015 Vittorio Romeo
// License: AFL 3.0 | https://opensource.org/licenses/AFL-3.0
// http://vittorioromeo.info | vittorio.romeo@outlook.com

#include <iostream>

// Let's rewrite the code snippet in a more organized manner, using
// comments to make obvious what it is actually happening.

template <typename TF, typename... Ts>
void forArgs(TF&& mFn, Ts&&... mArgs)
{
    // We require a context where variadic parameter expansion can
    // take place, so that we can expand the function call with every
    // passed argument.

    // We can use an `std::initializer_list` to create such context,
    // but any "brace-initializable" container works, like C-style
    // arrays. (Examples: `bool[]`, `int[]`)

    // These contexts guarantee that the arguments will be evaluated
    // in the correct order, unlike a generic variadic lambda, for
    // example.

    return (void)std::initializer_list<int>{
        // Every element of the `initializer_list` is an expression
        // enclosed in round parenthesis.
        (
            // In the parenthesis, the result of the `mFn` function
            // call is followed by the comma operator and an integer
            // (zero in this case).

            // Thanks to the comma operator, the expression evaluates
            // to an (unused) integer, which is accepted by the
            // `initializer_list`.

            mFn(
                // As we're taking the variadic arguments by
                // "forwarding reference", it is important
                // to use `std::forward` to correctly forward
                // their reference types to `mFn`.
                std::forward<Ts>(mArgs)),

            0)...};
}

// Still confused? Everything becomes clearer with an example
// expansion of a `forArgs` call:

/*

// The following `forArgs` call...

forArgs
(
    [](const auto& x){ std::cout << x << " "; },

    "hello",
    1,
    2,
    3
);

// ..roughly expands to...

(void) std::initializer_list<int>
{
    ([](const auto& x){ std::cout << x; }("hello"), 0),
    ([](const auto& x){ std::cout << x; }(1), 0),
    ([](const auto& x){ std::cout << x; }(2), 0),
    ([](const auto& x){ std::cout << x; }(3), 0)
}

// ...which is the same as writing...

std::cout << "hello";
std::cout << 1;
std::cout << 2;
std::cout << 3;

*/

int main()
{
    // Prints "hello123".
    forArgs(
        [](const auto& x)
        {
            std::cout << x;
        },

        "hello", 1, 2, 3);

    std::cout << "\n";
    return 0;
}

// In the next code segment we'll take a look at an example use case.
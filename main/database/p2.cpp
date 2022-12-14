// Copyright (c) 2015 Vittorio Romeo
// License: AFL 3.0 | https://opensource.org/licenses/AFL-3.0
// http://vittorioromeo.info | vittorio.romeo@outlook.com

#include <memory>
#include "../Other/Other.hpp"

// Let's work on our game objects.

// These are the entities we need:
// * Player
// * Boss
// * Bullet
// * PlayerBullet

// They share data and logic.
// Using a traditional object-oriented approach, sharing
// these elements is achieved by creating a polymorphic
// hierarchy of classes.

// Some classes will have a position, a velocity, and possibly
// an acceleration.

// Some classes will need to be rendered using shapes or sprites.

// Let's sketch our hierarchy:
//
//    GameObject
//    |
//    |----PhysObject
//         |
//         |----CirclePhysObject
//              |
//              |----CirclePhysDrawableObject
//              |    |----Bullet
//              |    |----PlayerBullet
//              |
//              |----CirclePhysDrawableRectObject
//                   |----Player
//                   |----Boss
//

// This kind of design is extremely unflexible.
// What if we want a rectangular bullet?
// What if we want another type of hitbox?

namespace example
{
    class Manager;

    class GameObject
    {
        friend class Manager;

    private:
        // Memory will be reclaimed from dead objects.
        bool alive{true};

        // Storing a pointer to the manager will allow us to access it
        // more conveniently during `update` and `draw` calls.
        Manager* manager{nullptr};

    public:
        virtual ~GameObject() {}

        virtual void update(FT) {}
        virtual void draw(sf::RenderTarget&) {}

        void kill() noexcept { alive = false; }

        auto& getManager() noexcept
        {
            assert(manager != nullptr);
            return *manager;
        }
    };

    class Manager
    {
    private:
        std::vector<std::unique_ptr<GameObject>> objects;

        // Let's add a map that will automatically group objects
        // together depending on their type.
        std::map<std::size_t, std::vector<GameObject*>> grouped;

        // Since we're going to use the "erase-remove_if" idiom
        // both on the main container and on the auxiliary map,
        // it is a good idea to abstract it using a template method.
        template <typename TContainer>
        void cleanup(TContainer& mC)
        {
            mC.erase(std::remove_if(std::begin(mC), std::end(mC),

                         // This predicate will work properly both for
                         // `unique_ptr` and raw pointers.
                         [](const auto& p)
                         {
                             return !p->alive;
                         }),
                std::end(mC));
        }

        // This function will return a `std::size_t` hash
        // for a specific type `T`.
        // The hash will be used as the key for our map.
        template <typename T>
        auto idOf() const noexcept
        {
            return typeid(T).hash_code();
        }

    public:
        template <typename T, typename... TArgs>
        auto& emplace(TArgs&&... mArgs)
        {
            objects.emplace_back(std::make_unique<T>(FWD(mArgs)...));
            auto& result(*(objects.back()));

            // Let's assign the manager to the newly created object.
            result.manager = this;

            // Let's emplace a raw pointer inside the map.
            grouped[idOf<T>()].emplace_back(&result);

            return result;
        }

        void refresh()
        {
            // Cleanup grouped storage.
            for(auto& pair : grouped) cleanup(pair.second);

            // Cleanup main container (and reclaim memory).
            cleanup(objects);
        }

        void update(FT mFT)
        {
            for(auto i(0u); i < objects.size(); ++i) objects[i]->update(mFT);
        }

        void draw(sf::RenderTarget& mRT)
        {
            for(auto i(0u); i < objects.size(); ++i) objects[i]->draw(mRT);
        }

        auto getObjectCount() const noexcept { return objects.size(); }

        // Call `mFunction` on every object of type `T`.
        template <typename T, typename TFunction>
        void forAll(TFunction&& mFunction)
        {
            auto& vec(grouped[idOf<T>()]);

            for(auto i(0u); i < vec.size(); ++i)
                mFunction(static_cast<T&>(*vec[i]));
        }
    };

    // This class will begin a new hierarchy of objects with a position,
    // a velocity and an acceleration.
    class PhysObject : public GameObject
    {
    private:
        Vec2f pos, vel, acc;

    public:
        void update(FT mFT) override
        {
            GameObject::update(mFT);

            vel += acc * mFT;
            pos += vel * mFT;
        }

        void setPos(const Vec2f& mX) noexcept { pos = mX; }
        void setVel(const Vec2f& mX) noexcept { vel = mX; }
        void setAcc(const Vec2f& mX) noexcept { acc = mX; }

        // Move towards an angle with a specific speed.
        void setVel(float mRadians, float mSpeed) noexcept
        {
            auto x(ssvs::getVecFromRad(mRadians) * mSpeed);
            setVel(x);
        }

        const auto& getPos() const noexcept { return pos; }
        const auto& getVel() const noexcept { return vel; }
        const auto& getAcc() const noexcept { return acc; }
    };

    // This class will begin a new hierarchy of object with a circle
    // hitbox. The hitbox will be used for collision detection.
    class CirclePhysObject : public PhysObject
    {
    private:
        float radius;

    public:
        auto collidesWith(GameObject& mX)
        {
            // Some sort of run-time dispatch is usually necessary
            // when dealing with polymorphic hierarchies.
            auto cpo(dynamic_cast<CirclePhysObject*>(&mX));

            if(cpo)
            {
                // {image: p2_d0}

                auto dist(ssvs::getDistEuclidean(getPos(), cpo->getPos()));

                return dist <= (radius + cpo->radius);
            }

            return false;
        }

        void setRadius(float mX) noexcept { radius = mX; }
        auto getRadius() const noexcept { return radius; }
    };

    class CirclePhysDrawableObject : public CirclePhysObject
    {
    private:
        sf::CircleShape shape;

    public:
        void update(FT mFT) override
        {
            CirclePhysObject::update(mFT);
            shape.setPosition(getPos());
        }

        void draw(sf::RenderTarget& mTarget) override
        {
            CirclePhysObject::draw(mTarget);
            mTarget.draw(shape);
        }

        void setShapeRadius(float mX) noexcept
        {
            shape.setOrigin(Vec2f{mX / 2.f, mX / 2.f});
            shape.setRadius(mX);
        }

        auto getShapeRadius() noexcept { return shape.getRadius(); }

        auto& getShape() noexcept { return shape; }
        const auto& getShape() const noexcept { return shape; }
    };

    class CirclePhysDrawableRectObject : public CirclePhysObject
    {
    private:
        sf::RectangleShape shape;

    public:
        void update(FT mFT) override
        {
            CirclePhysObject::update(mFT);
            shape.setPosition(getPos());
        }

        void draw(sf::RenderTarget& mTarget) override
        {
            CirclePhysObject::draw(mTarget);
            mTarget.draw(shape);
        }

        void setShapeSize(float mX, float mY) noexcept
        {
            shape.setOrigin(Vec2f{mX / 2.f, mX / 2.f});
            shape.setSize(Vec2f{mX, mY});
        }

        auto getShapeWidth() const noexcept { return shape.getSize().x; }

        auto getShapeHeight() const noexcept { return shape.getSize().y; }

        auto& getShape() noexcept { return shape; }
        const auto& getShape() const noexcept { return shape; }
    };

    class Player : public CirclePhysDrawableRectObject
    {
    public:
        Player()
        {
            setPos(Vec2f{320 / 2.f, 240 / 2.f});
            setRadius(1.3f);
            setShapeSize(6.f, 10.5f);
            getShape().setFillColor(sf::Color::Green);
        }

        void update(FT mFT) override
        {
            CirclePhysDrawableRectObject::update(mFT);

            constexpr float speed{2.f};
            Vec2f xyInput;

            if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Left))
                xyInput.x = -1;
            else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Right))
                xyInput.x = 1;

            if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Up))
                xyInput.y = -1;
            else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Down))
                xyInput.y = 1;

            auto radians(ssvs::getRad(xyInput));
            setVel(radians, ssvs::getMag(xyInput) * speed);
        }
    };

    class Bullet : public CirclePhysDrawableObject
    {
    private:
        float life{500.f};

    public:
        Bullet(const Vec2f& mPos)
        {
            setPos(mPos);
            setRadius(0.5f);
            setShapeRadius(1.f);
            getShape().setFillColor(sf::Color::Red);

            setVel(ssvu::getRndR(0.f, ssvu::tau), ssvu::getRndR(0.1f, 1.f));

            setAcc(Vec2f{
                ssvu::getRndR(-0.01f, 0.01f), ssvu::getRndR(-0.01f, 0.01f)});
        }

        void update(FT mFT) override
        {
            CirclePhysDrawableObject::update(mFT);

            life -= mFT;
            if(life <= 0.f) kill();
        }
    };

    class PlayerBullet : public CirclePhysDrawableObject
    {
    private:
        float life{100.f};

    public:
        PlayerBullet(const Vec2f& mPos)
        {
            setPos(mPos);
            setRadius(1.5f);
            setShapeRadius(0.6f);
            getShape().setFillColor(sf::Color::Yellow);

            setVel(-ssvu::pi / 2.f, 5.f);
        }

        void update(FT mFT) override
        {
            CirclePhysDrawableObject::update(mFT);

            life -= mFT;
            if(life <= 0.f) kill();
        }
    };

    class Boss : public CirclePhysDrawableRectObject
    {
    private:
        float dir{0};
        static constexpr float maxCooldown{70.f};
        float cooldown{maxCooldown};
        int health{100};

    public:
        Boss()
        {
            setPos(Vec2f{320 / 2.f, 50});
            setRadius(4.5f);
            setShapeSize(14.5f, 20.5f);
            getShape().setFillColor(sf::Color::Magenta);
        }

        void damage(int mX) noexcept { health -= mX; }
        void setDir(float mX) noexcept { dir = mX; }

        void update(FT mFT) override
        {
            constexpr float speed{0.75f};
            CirclePhysDrawableRectObject::update(mFT);

            if(health <= 0) kill();

            cooldown -= mFT;
            if(cooldown <= 0)
            {
                cooldown = maxCooldown;
                fire();
            }

            setVel(dir, speed);
        }

        void fire()
        {
            for(auto i(0u); i < 70; ++i) getManager().emplace<Bullet>(getPos());
        }
    };

    struct Game : Boilerplate::TestApp
    {
        Manager mgr;

        Game(ssvs::GameWindow& mX) : Boilerplate::TestApp{mX}
        {
            onTxtInfoUpdate += [this](auto& oss, FT)
            {
                oss << "Objects: " << mgr.getObjectCount() << "\n";
            };

            // Emplace the initial entities.
            mgr.emplace<Player>();
            mgr.emplace<Boss>();
        }

        void update(FT mFT) override
        {
            mgr.update(mFT);

            // Main game logic: nested loops based on the entities'
            // most derived types.
            mgr.forAll<Player>([this](auto& player)
                {
                    // Player-bullet interaction.
                    mgr.forAll<Bullet>([this, &player](auto& bullet)
                        {
                            if(bullet.collidesWith(player))
                            {
                                bullet.kill();
                                player.kill();
                            }
                        });

                    // Player-boss interaction.
                    mgr.forAll<Boss>([this, &player](auto& boss)
                        {
                            const auto& px(player.getPos().x);
                            const auto& bx(boss.getPos().x);

                            boss.setDir(px > bx ? 0.f : ssvu::pi);
                        });

                    // Player firing.
                    if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Z))
                        mgr.emplace<PlayerBullet>(player.getPos());
                });

            mgr.forAll<PlayerBullet>([this](auto& pb)
                {
                    // Player bullet-boss interaction.
                    mgr.forAll<Boss>([this, &pb](auto& boss)
                        {
                            if(pb.collidesWith(boss))
                            {
                                boss.damage(1);
                                pb.kill();
                            }
                        });
                });

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
#include <vector>
#include <type_traits>

// Here's our `forArgs` function without any comment.
// Doesn't look so scary anymore, does it?

template <typename TF, typename... Ts>
void forArgs(TF&& mFn, Ts&&... mArgs)
{
    return (void)std::initializer_list<int>{
        (mFn(std::forward<Ts>(mArgs)), 0)...};
}

// So, what is `forArgs` useful for?
// Let's see some potential use cases for it.

// ------------------------------------------------------------------

// Example use case: `make_vector` function.

// `make_vector` will take one or more arguments and return an
// `std::vector` containing them.

template <typename... TArgs>
auto make_vector(TArgs&&... mArgs)
{
    // First problem: what type should we return?
    // We need to deduce a type suitable for all the passed arguments.

    // `std::common_type_t` comes into play here.

    // Note:
    //
    //    * C++14 added many versions of commonly used
    //      type traits functions ending with "_t", that
    //      do not require the user to write `typename`
    //      at the beginning and `::type` at the end.
    //
    //    * C++11:
    //      using IntPtr = typename std::add_pointer<int>::type;
    //
    //    * C++14:
    //      using IntPtr = std::add_pointer_t<int>;
    //

    // `std::common_type_t` determines the common type among all
    // passed types - that is the type all passed types can be
    // implicitly converted to.

    // Computing the correct return type is now easy:
    using VectorItem = std::common_type_t<TArgs...>;
    std::vector<VectorItem> result;

    // We also know how many items we're going to put into the vector.
    // As a minor optimization, let's reserve memory beforehand.
    result.reserve(sizeof...(TArgs));

    // Now we use `forArgs` to generate the code that emplaces the
    // items into our vector:
    forArgs(
        // Our lambda needs to capture the vector and use a
        // "forwarding reference" to correctly forward the passed
        // argument to `std::vector::emplace_back`.
        [&result](auto&& x)
        {
            // We do not know the type of `x` - but we can retrieve
            // it using `decltype(x)`.
            result.emplace_back(std::forward<decltype(x)>(x));
        },

        std::forward<TArgs>(mArgs)...);

    return result;
}

int main()
{
    // Deduced as `std::vector<int>`;
    auto v0(make_vector(1, 2, 3, 4, 5));

    // This is roughly equivalent to writing:
    /*
        std::vector<int> result;
        result.reserve(5);

        result.emplace_back(1);
        result.emplace_back(2);
        result.emplace_back(3);
        result.emplace_back(4);
        result.emplace_back(5);

        return result;
    */

    static_assert(std::is_same<decltype(v0), std::vector<int>>(), "");

    // Prints "12345".
    for(const auto& x : v0) std::cout << x;
    std::cout << "\n";



    // Deduced as `std::vector<const char*>`;
    auto v1(make_vector("hello", " ", "everyone!"));

    static_assert(std::is_same<decltype(v1), std::vector<const char*>>(), "");

    // Prints "hello everyone!".
    for(const auto& x : v1) std::cout << x;
    std::cout << "\n";



    // Deduced as `std::vector<std::string>`.
    // This happens because `const char*` can be implicitly
    // converted to `std::string`, but not vice versa.
    auto v2(make_vector("hello", " ", std::string{"world"}));

    static_assert(std::is_same<decltype(v2), std::vector<std::string>>(), "");

    // Prints "hello world".
    for(const auto& x : v2) std::cout << x;
    std::cout << "\n";

    return 0;
}

// Before moving on, let's digress to cover a very useful C++14
// feature: compile-time integer sequences.

// This feature will be heavily used in the next code segments, to
// implement a version of `forArgs` with generic arity.// Copyright (c) 2015 Vittorio Romeo
// License: AFL 3.0 | https://opensource.org/licenses/AFL-3.0
// http://vittorioromeo.info | vittorio.romeo@outlook.com

#include <memory>
#include "../Other/Other.hpp"

// Let's work on our game objects.

// These are the entities we need:
// * Player
// * Boss
// * Bullet
// * PlayerBullet

// They share data and logic.
// Using a traditional object-oriented approach, sharing
// these elements is achieved by creating a polymorphic
// hierarchy of classes.

// Some classes will have a position, a velocity, and possibly
// an acceleration.

// Some classes will need to be rendered using shapes or sprites.

// Let's sketch our hierarchy:
//
//    GameObject
//    |
//    |----PhysObject
//         |
//         |----CirclePhysObject
//              |
//              |----CirclePhysDrawableObject
//              |    |----Bullet
//              |    |----PlayerBullet
//              |
//              |----CirclePhysDrawableRectObject
//                   |----Player
//                   |----Boss
//

// This kind of design is extremely unflexible.
// What if we want a rectangular bullet?
// What if we want another type of hitbox?

namespace example
{
    class Manager;

    class GameObject
    {
        friend class Manager;

    private:
        // Memory will be reclaimed from dead objects.
        bool alive{true};

        // Storing a pointer to the manager will allow us to access it
        // more conveniently during `update` and `draw` calls.
        Manager* manager{nullptr};

    public:
        virtual ~GameObject() {}

        virtual void update(FT) {}
        virtual void draw(sf::RenderTarget&) {}

        void kill() noexcept { alive = false; }

        auto& getManager() noexcept
        {
            assert(manager != nullptr);
            return *manager;
        }
    };

    class Manager
    {
    private:
        std::vector<std::unique_ptr<GameObject>> objects;

        // Let's add a map that will automatically group objects
        // together depending on their type.
        std::map<std::size_t, std::vector<GameObject*>> grouped;

        // Since we're going to use the "erase-remove_if" idiom
        // both on the main container and on the auxiliary map,
        // it is a good idea to abstract it using a template method.
        template <typename TContainer>
        void cleanup(TContainer& mC)
        {
            mC.erase(std::remove_if(std::begin(mC), std::end(mC),

                         // This predicate will work properly both for
                         // `unique_ptr` and raw pointers.
                         [](const auto& p)
                         {
                             return !p->alive;
                         }),
                std::end(mC));
        }

        // This function will return a `std::size_t` hash
        // for a specific type `T`.
        // The hash will be used as the key for our map.
        template <typename T>
        auto idOf() const noexcept
        {
            return typeid(T).hash_code();
        }

    public:
        template <typename T, typename... TArgs>
        auto& emplace(TArgs&&... mArgs)
        {
            objects.emplace_back(std::make_unique<T>(FWD(mArgs)...));
            auto& result(*(objects.back()));

            // Let's assign the manager to the newly created object.
            result.manager = this;

            // Let's emplace a raw pointer inside the map.
            grouped[idOf<T>()].emplace_back(&result);

            return result;
        }

        void refresh()
        {
            // Cleanup grouped storage.
            for(auto& pair : grouped) cleanup(pair.second);

            // Cleanup main container (and reclaim memory).
            cleanup(objects);
        }

        void update(FT mFT)
        {
            for(auto i(0u); i < objects.size(); ++i) objects[i]->update(mFT);
        }

        void draw(sf::RenderTarget& mRT)
        {
            for(auto i(0u); i < objects.size(); ++i) objects[i]->draw(mRT);
        }

        auto getObjectCount() const noexcept { return objects.size(); }

        // Call `mFunction` on every object of type `T`.
        template <typename T, typename TFunction>
        void forAll(TFunction&& mFunction)
        {
            auto& vec(grouped[idOf<T>()]);

            for(auto i(0u); i < vec.size(); ++i)
                mFunction(static_cast<T&>(*vec[i]));
        }
    };

    // This class will begin a new hierarchy of objects with a position,
    // a velocity and an acceleration.
    class PhysObject : public GameObject
    {
    private:
        Vec2f pos, vel, acc;

    public:
        void update(FT mFT) override
        {
            GameObject::update(mFT);

            vel += acc * mFT;
            pos += vel * mFT;
        }

        void setPos(const Vec2f& mX) noexcept { pos = mX; }
        void setVel(const Vec2f& mX) noexcept { vel = mX; }
        void setAcc(const Vec2f& mX) noexcept { acc = mX; }

        // Move towards an angle with a specific speed.
        void setVel(float mRadians, float mSpeed) noexcept
        {
            auto x(ssvs::getVecFromRad(mRadians) * mSpeed);
            setVel(x);
        }

        const auto& getPos() const noexcept { return pos; }
        const auto& getVel() const noexcept { return vel; }
        const auto& getAcc() const noexcept { return acc; }
    };

    // This class will begin a new hierarchy of object with a circle
    // hitbox. The hitbox will be used for collision detection.
    class CirclePhysObject : public PhysObject
    {
    private:
        float radius;

    public:
        auto collidesWith(GameObject& mX)
        {
            // Some sort of run-time dispatch is usually necessary
            // when dealing with polymorphic hierarchies.
            auto cpo(dynamic_cast<CirclePhysObject*>(&mX));

            if(cpo)
            {
                // {image: p2_d0}

                auto dist(ssvs::getDistEuclidean(getPos(), cpo->getPos()));

                return dist <= (radius + cpo->radius);
            }

            return false;
        }

        void setRadius(float mX) noexcept { radius = mX; }
        auto getRadius() const noexcept { return radius; }
    };

    class CirclePhysDrawableObject : public CirclePhysObject
    {
    private:
        sf::CircleShape shape;

    public:
        void update(FT mFT) override
        {
            CirclePhysObject::update(mFT);
            shape.setPosition(getPos());
        }

        void draw(sf::RenderTarget& mTarget) override
        {
            CirclePhysObject::draw(mTarget);
            mTarget.draw(shape);
        }

        void setShapeRadius(float mX) noexcept
        {
            shape.setOrigin(Vec2f{mX / 2.f, mX / 2.f});
            shape.setRadius(mX);
        }

        auto getShapeRadius() noexcept { return shape.getRadius(); }

        auto& getShape() noexcept { return shape; }
        const auto& getShape() const noexcept { return shape; }
    };

    class CirclePhysDrawableRectObject : public CirclePhysObject
    {
    private:
        sf::RectangleShape shape;

    public:
        void update(FT mFT) override
        {
            CirclePhysObject::update(mFT);
            shape.setPosition(getPos());
        }

        void draw(sf::RenderTarget& mTarget) override
        {
            CirclePhysObject::draw(mTarget);
            mTarget.draw(shape);
        }

        void setShapeSize(float mX, float mY) noexcept
        {
            shape.setOrigin(Vec2f{mX / 2.f, mX / 2.f});
            shape.setSize(Vec2f{mX, mY});
        }

        auto getShapeWidth() const noexcept { return shape.getSize().x; }

        auto getShapeHeight() const noexcept { return shape.getSize().y; }

        auto& getShape() noexcept { return shape; }
        const auto& getShape() const noexcept { return shape; }
    };

    class Player : public CirclePhysDrawableRectObject
    {
    public:
        Player()
        {
            setPos(Vec2f{320 / 2.f, 240 / 2.f});
            setRadius(1.3f);
            setShapeSize(6.f, 10.5f);
            getShape().setFillColor(sf::Color::Green);
        }

        void update(FT mFT) override
        {
            CirclePhysDrawableRectObject::update(mFT);

            constexpr float speed{2.f};
            Vec2f xyInput;

            if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Left))
                xyInput.x = -1;
            else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Right))
                xyInput.x = 1;

            if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Up))
                xyInput.y = -1;
            else if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Down))
                xyInput.y = 1;

            auto radians(ssvs::getRad(xyInput));
            setVel(radians, ssvs::getMag(xyInput) * speed);
        }
    };

    class Bullet : public CirclePhysDrawableObject
    {
    private:
        float life{500.f};

    public:
        Bullet(const Vec2f& mPos)
        {
            setPos(mPos);
            setRadius(0.5f);
            setShapeRadius(1.f);
            getShape().setFillColor(sf::Color::Red);

            setVel(ssvu::getRndR(0.f, ssvu::tau), ssvu::getRndR(0.1f, 1.f));

            setAcc(Vec2f{
                ssvu::getRndR(-0.01f, 0.01f), ssvu::getRndR(-0.01f, 0.01f)});
        }

        void update(FT mFT) override
        {
            CirclePhysDrawableObject::update(mFT);

            life -= mFT;
            if(life <= 0.f) kill();
        }
    };

    class PlayerBullet : public CirclePhysDrawableObject
    {
    private:
        float life{100.f};

    public:
        PlayerBullet(const Vec2f& mPos)
        {
            setPos(mPos);
            setRadius(1.5f);
            setShapeRadius(0.6f);
            getShape().setFillColor(sf::Color::Yellow);

            setVel(-ssvu::pi / 2.f, 5.f);
        }

        void update(FT mFT) override
        {
            CirclePhysDrawableObject::update(mFT);

            life -= mFT;
            if(life <= 0.f) kill();
        }
    };

    class Boss : public CirclePhysDrawableRectObject
    {
    private:
        float dir{0};
        static constexpr float maxCooldown{70.f};
        float cooldown{maxCooldown};
        int health{100};

    public:
        Boss()
        {
            setPos(Vec2f{320 / 2.f, 50});
            setRadius(4.5f);
            setShapeSize(14.5f, 20.5f);
            getShape().setFillColor(sf::Color::Magenta);
        }

        void damage(int mX) noexcept { health -= mX; }
        void setDir(float mX) noexcept { dir = mX; }

        void update(FT mFT) override
        {
            constexpr float speed{0.75f};
            CirclePhysDrawableRectObject::update(mFT);

            if(health <= 0) kill();

            cooldown -= mFT;
            if(cooldown <= 0)
            {
                cooldown = maxCooldown;
                fire();
            }

            setVel(dir, speed);
        }

        void fire()
        {
            for(auto i(0u); i < 70; ++i) getManager().emplace<Bullet>(getPos());
        }
    };

    struct Game : Boilerplate::TestApp
    {
        Manager mgr;

        Game(ssvs::GameWindow& mX) : Boilerplate::TestApp{mX}
        {
            onTxtInfoUpdate += [this](auto& oss, FT)
            {
                oss << "Objects: " << mgr.getObjectCount() << "\n";
            };

            // Emplace the initial entities.
            mgr.emplace<Player>();
            mgr.emplace<Boss>();
        }

        void update(FT mFT) override
        {
            mgr.update(mFT);

            // Main game logic: nested loops based on the entities'
            // most derived types.
            mgr.forAll<Player>([this](auto& player)
                {
                    // Player-bullet interaction.
                    mgr.forAll<Bullet>([this, &player](auto& bullet)
                        {
                            if(bullet.collidesWith(player))
                            {
                                bullet.kill();
                                player.kill();
                            }
                        });

                    // Player-boss interaction.
                    mgr.forAll<Boss>([this, &player](auto& boss)
                        {
                            const auto& px(player.getPos().x);
                            const auto& bx(boss.getPos().x);

                            boss.setDir(px > bx ? 0.f : ssvu::pi);
                        });

                    // Player firing.
                    if(sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Z))
                        mgr.emplace<PlayerBullet>(player.getPos());
                });

            mgr.forAll<PlayerBullet>([this](auto& pb)
                {
                    // Player bullet-boss interaction.
                    mgr.forAll<Boss>([this, &pb](auto& boss)
                        {
                            if(pb.collidesWith(boss))
                            {
                                boss.damage(1);
                                pb.kill();
                            }
                        });
                });

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
#include <vector>
#include <type_traits>

// Here's our `forArgs` function without any comment.
// Doesn't look so scary anymore, does it?

template <typename TF, typename... Ts>
void forArgs(TF&& mFn, Ts&&... mArgs)
{
    return (void)std::initializer_list<int>{
        (mFn(std::forward<Ts>(mArgs)), 0)...};
}

// So, what is `forArgs` useful for?
// Let's see some potential use cases for it.

// ------------------------------------------------------------------

// Example use case: `make_vector` function.

// `make_vector` will take one or more arguments and return an
// `std::vector` containing them.

template <typename... TArgs>
auto make_vector(TArgs&&... mArgs)
{
    // First problem: what type should we return?
    // We need to deduce a type suitable for all the passed arguments.

    // `std::common_type_t` comes into play here.

    // Note:
    //
    //    * C++14 added many versions of commonly used
    //      type traits functions ending with "_t", that
    //      do not require the user to write `typename`
    //      at the beginning and `::type` at the end.
    //
    //    * C++11:
    //      using IntPtr = typename std::add_pointer<int>::type;
    //
    //    * C++14:
    //      using IntPtr = std::add_pointer_t<int>;
    //

    // `std::common_type_t` determines the common type among all
    // passed types - that is the type all passed types can be
    // implicitly converted to.

    // Computing the correct return type is now easy:
    using VectorItem = std::common_type_t<TArgs...>;
    std::vector<VectorItem> result;

    // We also know how many items we're going to put into the vector.
    // As a minor optimization, let's reserve memory beforehand.
    result.reserve(sizeof...(TArgs));

    // Now we use `forArgs` to generate the code that emplaces the
    // items into our vector:
    forArgs(
        // Our lambda needs to capture the vector and use a
        // "forwarding reference" to correctly forward the passed
        // argument to `std::vector::emplace_back`.
        [&result](auto&& x)
        {
            // We do not know the type of `x` - but we can retrieve
            // it using `decltype(x)`.
            result.emplace_back(std::forward<decltype(x)>(x));
        },

        std::forward<TArgs>(mArgs)...);

    return result;
}

int main()
{
    // Deduced as `std::vector<int>`;
    auto v0(make_vector(1, 2, 3, 4, 5));

    // This is roughly equivalent to writing:
    /*
        std::vector<int> result;
        result.reserve(5);

        result.emplace_back(1);
        result.emplace_back(2);
        result.emplace_back(3);
        result.emplace_back(4);
        result.emplace_back(5);

        return result;
    */

    static_assert(std::is_same<decltype(v0), std::vector<int>>(), "");

    // Prints "12345".
    for(const auto& x : v0) std::cout << x;
    std::cout << "\n";



    // Deduced as `std::vector<const char*>`;
    auto v1(make_vector("hello", " ", "everyone!"));

    static_assert(std::is_same<decltype(v1), std::vector<const char*>>(), "");

    // Prints "hello everyone!".
    for(const auto& x : v1) std::cout << x;
    std::cout << "\n";



    // Deduced as `std::vector<std::string>`.
    // This happens because `const char*` can be implicitly
    // converted to `std::string`, but not vice versa.
    auto v2(make_vector("hello", " ", std::string{"world"}));

    static_assert(std::is_same<decltype(v2), std::vector<std::string>>(), "");

    // Prints "hello world".
    for(const auto& x : v2) std::cout << x;
    std::cout << "\n";

    return 0;
}

// Before moving on, let's digress to cover a very useful C++14
// feature: compile-time integer sequences.

// This feature will be heavily used in the next code segments, to
// implement a version of `forArgs` with generic arity.
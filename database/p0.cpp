// Copyright (c) 2015 Vittorio Romeo
// License: MIT License | http://opensource.org/licenses/MIT
// http://vittorioromeo.info | vittorio.romeo@outlook.com

// This code segments shows the "boilerplate" code we're going to
// use.

// The `Other` module will include code that deals with
// graphics/input management and general-purpose utilities.
#include "../Other/Other.hpp"

// Let's begin by creating a simple window that we'll use for our
// game example.

namespace example
{
    // By deriving from `Boilerplate::TestApp`, we can easily
    // define a class representing a simple game.
    struct Game : Boilerplate::TestApp
    {
        Game(ssvs::GameWindow& mX) : Boilerplate::TestApp{mX}
        {
            // We can print debug text with this "delegate".
            onTxtInfoUpdate += [this](auto& oss, FT)
            {
                oss << "Hello world!\n";
            };
        }

        // Logic can be defined by overriding the following methods.
        void update(FT) override {}
        void draw() override {}
    };
}

int main()
{
    // The app is ran by instantiating `Boilerplate::AppRunner`.
    Boilerplate::AppRunner<example::Game>{"ECS", 320, 240};
    return 0;
}

// In the interest of time, the `p1` and `p2` OOP implementation
// segments will be explained and executed very quickly.// Copyright (c) 2015 Vittorio Romeo
// License: AFL 3.0 | https://opensource.org/licenses/AFL-3.0
// http://vittorioromeo.info | vittorio.romeo@outlook.com

#include <iostream>
#include <initializer_list>

// Welcome to my talk:
// "`for_each_argument` explained and expanded".

// During this presentation we'll take a look at a very interesting
// code snippet, originally posted on Twitter by Sean Parent.

// {image: p0_d0}

// We'll also cover a very useful C++14 standard library addition,
// "compile-time integer sequences", and briefly take a look at C++17
// "fold expressions".

// ------------------------------------------------------------------

// So, what does `for_each_argument` do?
// Well, the name is pretty self-explanatory...

// It invokes a callable object on every passed argument.

template <class F, class... Ts>
void for_each_argument(F f, Ts&&... a)
{
    (void)std::initializer_list<int>{(f(std::forward<Ts>(a)), 0)...};
}

int main()
{
    // Prints "hello123".
    for_each_argument(
        [](const auto& x)
        {
            std::cout << x;
        },

        "hello", 1, 2u, 3.f);

    std::cout << "\n";
    return 0;
}

// That is cool. How does it work?
// Let's discover that in the next code segment.
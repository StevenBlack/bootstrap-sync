# Boostrap-sync

> "The reason that God was able to create the world in seven days is
that he didn't have to worry about the installed base."
- [Enzo Torresi](http://www.worldclassrd.org/quotations/1406)

## Intro
This repository demonstrates the data-driven and controlled versioning of a [Bootstrap](http://getbootstrap.com)-based website.

For the purpose of this repo I'm using [Jekyll](http://jekyllrb.com), but that's merely an implementation detail

Here we see:

1. A `_bootstrap` folder, named with a leading "_" so Jekyll will ignore it in its build process.  This folder contains managed copies of `fonts`, `js`, and `less` folders that come straight from Bootstrap.
1. A `_less` folder named with a leading "_" . This folder contains two files which configure this particular website:
	* `variables-override.less` which overrides some elements within Bootstrap's `variablers.less`, and
	* `custom.less` which is the custom build order for CSS.


### The Problem

**Bootstrap** is the most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.  It's [continuous development](https://github.com/twbs/bootstrap/commits/master) makes it difficult to keep your websites current and in-sync as Bootstrap evolves.

In particular:

* If you [compile its source](http://getbootstrap.com/getting-started/#grunt) to selectively include its various components, **how do you maintain links to Bootstrap's development as it evolves**?

* How can you maintain **one or more Bootstrap clones** along with potentially **several Bootstrap-based sites** for each clone?

* How can you maintain various Bootstrap-based projects, each with **different formulations CSS and JS assets** which could intermix with products from other vendors?

* How do you manage some projects that **deploy directly**, while other projects -- Jekyll projects, for example -- that use Bootstrap assets as **primary inputs**?

### Factors to Consider

* Bootstrap is distributed to build itself for display in the [getbootstrap.com](getbootstrap.com) website, which probably does not match exactly what you need.

* Bootstrap uses advanced Grunt techniques in its build process that, for the most part, is geared more towards the needs of [getbootstrap.com](getbootstrap.com) than your particular implementation needs.

* As a result many developers simply use pre-built and pre-minimized Bootstrap files along with themes because they are dissuaded by the complexity of stripping Bootstrap of its components they don't need.  Therefore Bootstrap sites tend to be more bloated than they could be.  Because that's just easy.

(Still working on the ReadMe)

----

The interesting parts are the `gruntfile.js` file, the `package.json` file, and a new file named `options.js` which adds extensibility to the gruntfile so bootstrap can be more easily versioned. 

## Author

**Steven Black**

+ [github/StevenBlack](https://github.com/StevenBlack)
+ [twitter/SteveBlack](http://twitter.com/SteveBlack)

## Release History
    **DATE**       **VERSION**   **CHANGES**
    2014-07-02     v0.0.0        Starting with a vanilla Jekyll project.

## License
Copyright (c) 2014-2015 Steven Black
Released under the MIT license



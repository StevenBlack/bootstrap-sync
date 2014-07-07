# Versionable Boostrap (here with Jekyll)

> "The reason that God was able to create the world in seven days is
that he didn't have to worry about the installed base."
- [Enzo Torresi](http://www.worldclassrd.org/quotations/1406)

This repository shows a [Bootstrap](http://getbootstrap.com) deployment that maintains links to a locally authoritative Bootstrap repo.

The Bootstrap deployment and its locally authoritative Bootstrap repo can be versioned separately as Bootstrap continually evolves on Github.

Here I'm using a vanilla [Jekyll](jekyllrb.com) deployment but that's just an implementation detail.  

## The Problem

**Bootstrap** is a ubiquitous project but it currently falls a little short in the following ways:

* If you [compile its source](http://getbootstrap.com/getting-started/#grunt) to selectively include its various components, **how do you maintain links to Bootstrap's development as it evolves**?

* How can you maintain one or more **locally authoritative versions** of Bootstrap, along with potentially **several Bootstrap implementations** for each version?

* How can you maintain various Bootstrap-based projects, each with **different formulations (in composition and names) of assets like CSS and JS** which could intermix with products from other vendors?

* How do you manage some projects that **deploy directly**, while other projects -- Jekyll projects, for example -- that use Bootstrap assets as **primary inputs**?

## Factors to Consider

* Bootstrap is distributed to build itself for display in the [getbootstrap.com](getbootstrap.com) website, which probably does not match exactly what you need.

* Bootstrap uses advanced Grunt techniques in its build process that, for the most part, is geared more towards the needs of [getbootstrap.com](getbootstrap.com) than your particular implementation needs.

* As a result many developers simply use pre-built and pre-minimized Bootstrap files along with themes because they are dissuaded by the complexity of stripping Bootstrap of its components they don't need.  Therefore Bootstrap sites tend to be more bloated than they could be.  Because that's just easy.




The interesting parts are the `gruntfile.js` file, the `package.json` file, and a new file named `options.js` which adds extensibility to 




helps to version sites built with [Bootstrap](http://getbootstrap.com) -- and in this case [Jekyll](http://jekyllrb.com) so bootstrap can be easily versioned. 

## Author

**Steven Black**

+ [github/StevenBlack](https://github.com/StevenBlack)
+ [twitter/SteveBlack](http://twitter.com/SteveBlack)

## Release History
    **DATE**       **VERSION**   **CHANGES**
    2014-07-02     v0.0.0        Starting with a vanilla Jekyll project.

## License
Copyright (c) 2014 Steven Black
Released under the MIT license



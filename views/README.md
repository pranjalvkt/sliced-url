**Problem Definition**

In today&#39;s growing world, almost every single thing is directly or indirectly done by a Website, In our day-to-day life we access website using some URL, these URL&#39;s are sometime quite long to remember and for an Average person it may be painful, to overcome this kind of difficulty **URL Shorteners** are used.

URL shortening is a technique on the World Wide Web in which a Uniform Resource Locator (URL) may be made substantially shorter and still direct to the required page. This is achieved by using a redirect which links to the web page that has a long URL.

There are several reasons to use URL shortening. Often regular un-shortened links may be aesthetically unpleasing. Many web developers pass descriptive attributes in the URL to represent data hierarchies, command structures, transaction paths or session information. This can result in URLs that are hundreds of characters long and that contain complex character patterns. Such URLs are difficult to memorize, type out or distribute. As a result, long URLs must be copied and pasted for reliability. Thus, short URLs may be more convenient for websites or hard copy publications (e.g. a printed magazine or a book), the latter often requiring that very long strings be broken into multiple lines (as is the case with some e-mail software or internet forums) or truncated.

**Software Configuration**

This website is developed using Node.js (Express Framework). is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.

**Version: ^** 4.17.1

**Developers:** TJ Holowaychuk, StrongLoop and others.

**License:** MIT License

**Operating system:** Windows 10

**Database:** MongoDB

**Software tools used**

The whole Project is divided in two parts the front end and the back end.

*FRONT-END*

The front end is designed using of JavaScript (Angular5), CSS, HTML etc.

*BACK END*

The Back-end is designed using Node.js and MongoDB.


**Overview**

[https://slicedurl.herokuapp.com](https://slicedurl.herokuapp.com/) generates a short URL corresponding long URL. URL shortening is a technique on the [World Wide Web](https://en.wikipedia.org/wiki/World_Wide_Web) in which a [Uniform Resource Locator](https://en.wikipedia.org/wiki/Uniform_Resource_Locator) (URL) may be made substantially shorter and still direct to the required page. This is achieved by using a [redirect](https://en.wikipedia.org/wiki/URL_redirection) which links to the [web page](https://en.wikipedia.org/wiki/Web_page) that has a long URL. For example, the URL &quot;[https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12385812#overview/](https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/12385812#overview/)&quot; can be shortened to &quot;[https://slicedurl.herokuapp.com/46acdp](https://slicedurl.herokuapp.com/46acdp)&quot;.

Other uses of URL shortening are to &quot;beautify&quot; a link, track clicks, or disguise the underlying address. Although disguising of the underlying address may be desired for legitimate business or personal reasons, it is open to abuse. Some URL shortening service providers have found themselves on spam [blocklists](https://en.wikipedia.org/wiki/Blocklist), because of the use of their redirect services by sites trying to bypass those very same blocklists. Some websites prevent short, redirected URLs from being posted.

In URL shortening, every long URL is associated with a [unique key](https://en.wikipedia.org/wiki/Unique_key), which is the part after its [top-level domain name](https://en.wikipedia.org/wiki/Top-level_domain_name). For example, https://tinyurl.com/m3q2xt has a key of m3q2xt. Not all redirection is treated equally; the redirection instruction sent to a browser can contain in its header the [HTTP status](https://en.wikipedia.org/wiki/HTTP_status) 301 (Moved Permanently), 302 (Found), 307 (Temporary Redirect) or 308 (Permanent Redirect).

The overall system design objective is to provide an efficient, modular design that will reduce the system&#39;s complexity, facilitate change and result in an easy implementation. This will be accomplished by designing a strongly cohesion system with minimal coupling. In additional, this document will provide interface design models that are consistent, user friendly, and will provide straightforward transitions through the various system functions

The purpose of design phase is to plan a solution for problem specified by the requirements. System design aims is to identify the modules that should be in the system the specification of these modules and how they interact with each other to produce the desired result. The goal of the design process is to produce a module or representation of a system which can be used later to build that system. The produced model is called design of the system. The most important phase of the software of the system is designing the different modules. The accurate planning and proper interconnections with the modules will give a good output in the implementation part.

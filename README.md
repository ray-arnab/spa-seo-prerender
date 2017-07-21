# SEO for Single Page Applications using Prerender.io


## Introduction

The 'views' representing various 'states' of a single page application are fetched after page load.
This poses a challenge to make important meta information for such views to be made available to crawlers.
Here is a demonstration of how this may be solved using prerender.io.

References: 

https://developers.google.com/webmasters/ajax-crawling/docs/specification
https://prerender.io/js-seo/angularjs-seo-get-your-site-indexed-and-to-the-top-of-the-search-results/



## Problem

Typically user navigation of a SPA would result in URLs such as the ones given below:

http://local.spa.com/index.html#/book
http://local.spa.com/index.html#/checkIn
http://local.spa.com/index.html#/myTrips


While there is a whole gamut of meta information that can be touched upon, for simplicity, in this example, we work with only title and meta-description.
As one navigates through the menu, one can see using a browser dev tool that these values are changing.

But the page source remains the same because the page is not loading again per view, and one will find placeholders in title and description:

<pre>

<title>SPA Demo | {{ seo.pageTitle }}</title>
<meta name="description" content="{{ seo.pageDescription }}"/>

</pre>

The crawlers cannot execute javascript, so they get this 'page-source' view of the request URL.



## Solution

The application needs to use hash-bang (#!) URLs instead of hash (#) as shown below:

http://local.spa.com/index.html#!/book

In that case, the crawler may request each view using 'ugly' URLs as shown below:

http://local.spa.com/index.html?_escaped_fragment_=/book

The ask is, as response to the above request, the server side infrastructure provides a markup that has such placeholders replaced by values.

The components in play here are:

1. A SPA (built using Spring boot)
2. Prerender.io setup in local
3. Apache Http Server



### High level Steps

1. Request hits Apache

2. Evaluate if there is a query parameter: _escaped_fragment_

3. If yes, proxy the request to back-end prerender.io

4. If not, proxy request to back-end web application



### Setup

1. Spring boot application

Run as:
<pre>
mvn spring-boot:run
</pre>

It starts on port 8083 and can be directly accessed as http://localhost:8083


2. Apache Http Server

I have used Apache 2.2 on Windows machine.

a) Ensure you have mod_proxy and mod_rewite enabled in httpd.conf 

b) The vhost entry is given below:

<pre>

	<VirtualHost *:80>
		ServerAdmin webmaster@spa.com
		DocumentRoot "/Apache22/htdocs"
		ServerName local.spa.com
		RewriteEngine on
		RewriteRule    ^/$  /index.html [R=301,QSA]
		
		<IfModule mod_proxy_http.c>
			RewriteCond %{HTTP_USER_AGENT} baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator [NC,OR]
			RewriteCond %{QUERY_STRING} _escaped_fragment_
			
			# Only proxy the request to Prerender if it's a request for HTML
			RewriteRule ^(?!.*?(\.js|\.css|\.xml|\.less|\.png|\.jpg|\.jpeg|\.gif|\.pdf|\.doc|\.txt|\.ico|\.rss|\.zip|\.mp3|\.rar|\.exe|\.wmv|\.doc|\.avi|\.ppt|\.mpg|\.mpeg|\.tif|\.wav|\.mov|\.psd|\.ai|\.xls|\.mp4|\.m4a|\.swf|\.dat|\.dmg|\.iso|\.flv|\.m4v|\.torrent|\.ttf|\.woff))(.*) http://localhost:3000/http://%{HTTP_HOST}/$2 [P,L]
		</IfModule>
		
		RewriteRule    ^/(.+)$  http://localhost:8083/$1 [P,L]
		
		ErrorLog "logs/spa.com-error.log"
		CustomLog "logs/spa.com-access.log" common    
	</VirtualHost>

</pre>

c) Introduce a host file entry for local.spa.com mapped to localhost.


3. Prerender IO

Prerequiste: To install and run the same one will need npm and cygwin (for Windows)

Reference: https://github.com/prerender/prerender

<pre>
$ git clone https://github.com/prerender/prerender.git
$ cd prerender
</pre>

One time installation
<pre>
$ npm install
</pre>

Run the same
<pre>
$ node server.js
</pre>




Now access the application as:

http://local.spa.com/index.html#!/book


And also as shown below (simulating a crawler):

http://local.spa.com/index.html?_escaped_fragment_=/book


View the page source in each case. For the latter, the markup should have appropriate values replacing the placeholders.
sample-geo-angular
==================

AngularJS version of [Geo App](https://github.com/franciov/geo) by [Francesco Iovine](http://www.francesco.iovine.name/).  The orignal version was written for MDN article [Plotting yourself on the map](https://developer.mozilla.org/en-US/Apps/Build/gather_and_modify_data/Plotting_yourself_on_the_map).

Setup
=====

This project is desgined to be used under the following directory structure:

```
+ sample-geo-angular/
|- master/     # Clone of master branch
|- gh-pages/   # Clone of gh-pages branch
```

Here is command line used to create the directory structure above:
```
mkdir sample-geo-angular
cd sample-geo-angular
git clone https://github.com/marcoslin/sample-geo-angular.git master
git clone -b gh-pages --single-branch https://github.com/marcoslin/sample-geo-angular.git gh-pages
```

Once project has been cloned, do:

```
cd sample-geo-angular/master/setup/

# Install needed components
npm install

# Copy the downloaded components to the www directory
grunt setup

# Launch the dev webserver and watch for changes
grunt devel

# Deploy changes to gh-pages/ directory
grunt deploy

```

# Setup

This app relies on several environment variables, and these are necessary
to run on a server or in a testing environment. The commands are different
for Heroku and for a local machine. Security keys should never be pushed in
a commit, so this is a necessary setup process.

To setup local variables on a Mac:

    export AWS_ACCESS_KEY_ID="{key1}"
    export AWS_SECRET_ACCESS_KEY="{key2}"
    export MANDRILL_API_KEY="{key3}"

To check that you've set the variables correctly, check that those variables
are included in your overall list of environment variables, which outputs
with the following command.

    printenv

To setup system variables on Heroku:

    heroku config:set AWS_ACCESS_KEY_ID={key1}
    heroku config:set AWS_SECRET_ACCESS_KEY={key1}
    heroku config:set MANDRILL_API_KEY={key1}

Note that the setting variables locally uses quotation marks, but heroku
commands do not. This is intentional. To similarly print the environment
variables, run:

    heroku config

As always, you should have a virtual environment set up and install the
requirements. For the production environment:

    pip install -r requirements.txt

For the development environment:

    pip install -r dev_requirements.txt

# Instructions for Development Network

1) install Node JS because it comes with npm

https://nodejs.org/

2) install localtunnel

    $ npm install -g localtunnel

3) do the runserver command as follows:

    $ python manage.py runserver 0.0.0.0:8000

4) open up a new terminal window and start the local tunnel

    $ lt --port 8000 --subdomain sharelockers

5) plug in the Arduino / RasPi


# Single Page App Template Setup

The following command was run at the start of this project. It should not be run
a second time. If you wish to use this template, see the following repo:

https://github.com/tiyd-python-2015-05/single-page-app-template

The template was run with the following command:

```
django-admin.py startproject sharelockers --template=https://github.com/tiyd-python-2015-05/single-page-app-template/archive/master.zip --extension=py,md --name=Procfile
```

## Places used for front-end

* `sharelockers/templates/index.html` - This is where all your HTML should go. It has a few funny things in there. Make sure to use `\{% static "path/to/file.css" %\}` for all links to static files.

* `sharelockers/static/` - Do not put any files here. They will be removed by gulp.

* `src/` - this is where gulpfile.js coppies from.

## Heroku instructions

This app should work well with Heroku as long as you run the following commands:

```
heroku config:set DJANGO_SETTINGS_MODULE=sharelockers.heroku_settings
heroku config:set PYTHONPATH=sharelockers
heroku config:set SECRET_KEY=$(date | md5 | base64)
```

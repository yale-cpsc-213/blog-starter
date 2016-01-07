# CPSC113 Blog Starter

Teams in CPSC113 will turn in their weekly updates by keeping a blog. This is
a starter blog for you. It accomplishes a few things:

* All data is kept in flat files so you can keep them under version control
  and so that we can comment easily on your progress via your repository
  hosted at [http://git.yale.edu](git.yale.edu).
* The application can be deployed to Heroku.
* The application allows only your team and the instructors to view it and
  relies on Yale CAS authentication to do that.

## Editing your blog

To start, you'll need to clone this repository.

  git clone git@git.yale.edu:cpsc-113-spring-2016/blog-starter.git

To run the application, you'll need [Node](https://nodejs.org/en/) installed.
We recommend version v4.2.4LTS. Once you have node installed, cd into the
`blog-starter` directory and install the node dependencies:

  npm install

Then, you can run the application with the following command:

  node index.js

If you're going to do a lot of editing, you might prefer to run it with
nodemon, which will restart the server every time your source files change.

  PORT=4000 ./node_modules/.bin/nodemon -e 'js,html,yaml,css' index.js

To update the blog, you'll be editing and adding `.yaml` files in the
`data/updates` directory. Before you get into that, you'll likely want
to customize `data/team.yaml` to correspond to your team, rather than
the demo data with which we've populated it. 

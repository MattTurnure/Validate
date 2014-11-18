Validate
========

### Usage ###

#### Markup ####
For each input that you want to validate, add a 'data-validate' attribute to that input element with one of these values:

* required
* email
* telephone
* zip

Also add a unique ID to your form (i.e. _form-contact_)

#### JavaScript ####
In your JavaScript, inititialize with:

validate.init('form-contact');

'form-contact' would be the id on your form.

#### Icons ####

I am using nifty icons from [IcoMoon](https://icomoon.io/). So if you want, grab a checkmark and an 'x'. Make sure you update your class names for those respective icons in Validate.js.

Here is how I have mine:

* success_icon_classname: 'icon-ok',
* error_icon_classname: 'icon-remove'

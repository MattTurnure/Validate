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

Validate.initFormValidation('form-contact');

'form-contact' would be the id on your form.

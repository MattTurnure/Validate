var validate = {
    success_icon_classname: 'icon-ok',
    error_icon_classname: 'icon-error',

    rules: {
        required: /\S/,
        email: /^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/,
        telephone: /^(\+\d+)?( |\-)?(\(?\d+\)?)?( |\-)?(\d+( |\-)?)*\d+$/,
        zip: /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/i,

        dropdown: function (val) {
            'use strict';
            if ( val === 0 || val === '-1' || val === '0' || val === 'Select One' || val === 'Select Description') {
                return false;
            } else {
                return true;
            }
        },

        checkbox: function (val) {
            'use strict';
            if (val === false) {
                return false;
            } else {
                return true;
            }
        }
    },

    errors: {
        required: 'Required field',
        email: 'Invalid email address',
        telephone: 'Invalid telephone number',
        zip: 'Invalid ZIP code',
        dropdown: 'Must select one',
        checkbox: 'Must agree to register'
    },

    init: function (id) {
        'use strict';

        var field_ary = validate.getRequiredFieldArray(id),
            form      = document.getElementById(id),
            len       = field_ary.length,
            i         = 0;

        for (i = 0; i < len; i++) {
            validate.setSingleValidationTimer(field_ary[i]);
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            validate.checkFields(field_ary, function (result) {
                if (result === true) {
                    form.submit();
                }
            });
        }, false);
    },

    setSingleValidationTimer: function (input_obj) {
        'use strict';

        input_obj.addEventListener('blur', function () {
            validate.checkThisField(input_obj);
        }, false);
    },

    getValidationMessage: function (error_type) {
        'use strict';

        var message;

        switch (error_type) {
            case 'required':
                message = validate.errors.required;
                break;
            case 'email':
                message = validate.errors.email;
                break;
            case 'telephone':
                message = validate.errors.telephone;
                break;
            case 'zip':
                message = validate.errors.zip;
                break;
            case 'dropdown':
                message = validate.errors.dropdown;
                break;
            case 'checkbox':
                message = validate.errors.checkbox;
                break;
            default:
                message = validate.errors.required;
        }

        return message;
    },

    getValidationRegex: function (error_type) {
        'use strict';

        var regex;

        switch (error_type) {
            case 'required':
                regex = validate.rules.required;
                break;
            case 'email':
                regex = validate.rules.email;
                break;
            case 'telephone':
                regex = validate.rules.telephone;
                break;
            case 'zip':
                regex = validate.rules.zip;
                break;
            case 'dropdown':
                regex = validate.rules.dropdown;
                break;
            case 'checkbox':
                regex = validate.rules.checkbox;
                break;
            default:
                regex = validate.rules.required;
        }

        return regex;
    },

    getRequiredFieldArray: function (form_id) {
        'use strict';

        var fields       = document.getElementById(form_id).elements,
            len          = fields.length,
            i            = 0,
            required_ary = [];

        for (i = 0; i < len; i++) {
            if (fields[i].getAttribute('data-validate') !== null) {
                required_ary.push(fields[i]);
            }
        }

        return required_ary;
    },

    checkThisField: function (input_obj) {
        'use strict';

        var input_type    = input_obj.type.toLowerCase(),
            error_type    = input_obj.getAttribute('data-validate'),
            error_message = validate.getValidationMessage(error_type),
            regex         = validate.getValidationRegex(error_type),
            input_val;

        if (input_type === 'select-one') {
            input_val = input_obj.options[input_obj.selectedIndex].value;

            if (validate.rules.dropdown(input_val) === false) {
                validate.addErrorClasses(input_obj);
                validate.setErrorMessage(input_obj, error_message);
            } else {
                validate.addSuccessClasses(input_obj);
            }
        } else if (input_type === 'checkbox') {
            input_val = input_obj.checked;

            if (validate.rules.checkbox(input_val) === false) {
                validate.addErrorClasses(input_obj);
                validate.setErrorMessage(input_obj, error_message);
            } else {
                validate.addSuccessClasses(input_obj);
            }
        } else {
            input_val = input_obj.value;

            if (regex.test(input_val) === false) {
                validate.removeSuccessIcon(input_obj);
                validate.addErrorIcon(input_obj);
                validate.addErrorClasses(input_obj);
                validate.setErrorMessage(input_obj, error_message);
            } else {
                validate.addSuccessClasses(input_obj);
                validate.addSuccessIcon(input_obj);
            }
        }
    },

    checkFields: function (field_ary, callback) {
        'use strict';

        var len = field_ary.length,
            i = 0,
            input_obj,
            input_type,
            input_val,
            error_type,
            error_message,
            regex;

        if (typeof callback !== 'function') {
            return;
        }

        for (i = 0; i < len; i++) {
            input_obj     = field_ary[i];
            input_type    = input_obj.type.toLowerCase();
            error_type    = input_obj.getAttribute('data-validate');
            error_message = validate.getValidationMessage(error_type);
            regex         = validate.getValidationRegex(error_type);

            if (input_type === 'select-one') {
                input_val = input_obj.options[input_obj.selectedIndex].value;

                if (validate.rules.dropdown(input_val) === false) {
                    validate.addErrorClasses(input_obj);
                    validate.setErrorMessage(input_obj, error_message);

                    input_obj.focus();

                    callback(false);
                    return;
                } else {
                    validate.addSuccessClasses(input_obj);
                }
            } else if (input_type === 'checkbox') {
                input_val = input_obj.checked;

                if (validate.rules.checkbox(input_val) === false) {
                    validate.addErrorClasses(input_obj);
                    validate.setErrorMessage(input_obj, error_message);

                    input_obj.focus();
                    callback(false);
                    return;
                } else {
                    validate.addSuccessClasses(input_obj);
                }
            } else {
                input_val = input_obj.value;

                if (regex.test(input_val) === false) {
                    validate.removeSuccessIcon(input_obj);
                    validate.addErrorIcon(input_obj);
                    validate.addErrorClasses(input_obj);
                    //input_obj.value = error_message;
                    validate.setErrorMessage(input_obj, error_message);

                    input_obj.focus();
                    input_obj.select();

                    callback(false);
                    return;
                } else {
                    validate.addSuccessClasses(input_obj);
                    validate.addSuccessIcon(input_obj);
                }
            }
        }

        callback(true);
    },

    setErrorMessage: function (input_obj, message) {
        'use strict';

        var doc             = document,
            error_obj       = doc.createElement('p'),
            id              = input_obj.id + '-error-message',
            error_txt       = doc.createTextNode(message),
            input_container = input_obj.parentNode,
            field_type      = input_obj.type.toLowerCase();

        error_obj.className = 'error-inline';

        // Check to see if error already exists
        if (doc.getElementById(id) === null) {
            error_obj.setAttribute('id', id);
            error_obj.appendChild(error_txt);
            input_container.appendChild(error_obj);
        }

        switch (field_type) {
            case 'select-one':
                input_obj.addEventListener('change', function () {
                    validate.removeErrorMessage(id);
                    validate.removeErrorClasses(input_obj);
                    validate.removeErrorIcon(input_obj);
                }, false);
                break;
            case 'checkbox':
                input_obj.addEventListener('click', function () {
                    validate.removeErrorMessage(id);
                    validate.removeErrorClasses(input_obj);
                    validate.removeErrorIcon(input_obj);
                }, false);
                break;
            default:
                input_obj.addEventListener('keydown', function () {
                    validate.removeErrorMessage(id);
                    validate.removeErrorClasses(input_obj);
                    validate.removeErrorIcon(input_obj);
                }, false);
                break;
        }
    },

    removeErrorMessage: function (id) {
        'use strict';

        var error_obj = document.getElementById(id);

        if (error_obj !== null) {
            error_obj.parentNode.removeChild(error_obj);
        }
    },

    addSuccessClasses: function (input_obj) {
        'use strict';

        input_obj.classList.remove('error-input');
        input_obj.classList.add('success-input');
    },

    addErrorClasses: function (input_obj) {
        'use strict';

        input_obj.classList.add('error-input');
        input_obj.classList.remove('success-input');
    },

    removeErrorClasses: function (input_obj) {
        'use strict';

        input_obj.classList.remove('error-input');
    },

    addSuccessIcon: function (input_obj) {
        'use strict';

        var doc             = document,
            icon_success_id = input_obj.id + '-success',
            icon_success;

        validate.removeErrorIcon(input_obj);

        if (!doc.getElementById(icon_success_id)) {
            icon_success = doc.createElement('i');
            icon_success.setAttribute('id', icon_success_id);
            icon_success.className = validate.success_icon_classname;
            input_obj.parentNode.appendChild(icon_success);
        }
    },

    removeSuccessIcon: function (input_obj) {
        'use strict';

        var doc        = document,
            success_id = input_obj.id + '-success',
            success_obj;

        if (doc.getElementById(success_id)) {
            success_obj = doc.getElementById(success_id);
            success_obj.parentNode.removeChild(success_obj);
        }
    },

    addErrorIcon: function (input_obj) {
        'use strict';

        var doc             = document,
            icon_error_id   = input_obj.id + '-error',
            icon_error;

        if (!doc.getElementById(icon_error_id)) {
            icon_error = doc.createElement('i');
            icon_error.setAttribute('id', icon_error_id);
            icon_error.className = validate.error_icon_classname;
            input_obj.parentNode.appendChild(icon_error);
        }
    },

    removeErrorIcon: function (input_obj) {
        'use strict';

        var doc      = document,
            error_id = input_obj.id + '-error',
            error_obj;

        if (doc.getElementById(error_id)) {
            error_obj = doc.getElementById(error_id);
            error_obj.parentNode.removeChild(error_obj);
        }
    }
};

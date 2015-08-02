'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var getCookie = require('../js/getCookie');
var openLocker = require('../js/openLocker');
var alertStatus = require('../js/alertStatus');

module.exports = function(button) {
    var csrftoken = getCookie('csrftoken');
    $(document).on('click', button, function(e) {
        console.log($(this));
        $('.lgn-button').attr('data-price', $(this).data('price'));
        $('.lgn-button').attr('data-id', $(this).data('id'));
        $('.lgn-button').attr('data-locker', $(this).data('locker'));
        console.log($('.user-id').html().length);
        if ($('.user-id').html().length === 1) {
            $('.not-loggedin-container').css("width", "100%");
            $('.stock-wrapper').show();
            $('.close').click(function() {
                $('.stock-wrapper').hide();
                $('.not-loggedin-container').css("width", "0%");
                $('.buy-confirmation-container').css("width", "0%");
                $('.buy-open-container').css("width", "0%");
            });
            $('.lgn-button').click(function() {
                $('.buy-confirmation-container').css("width", "100%")
                $('.cost').html($(this).data('price'));
                $('.confirm-btn').attr('data-price', $(this).data('price'));
                $('.confirm-btn').attr('data-id', $(this).data('id'));
                $('.confirm-btn').attr('data-locker', $(this).data('locker'));
                var username = $('.username-login').val();
                var password = $('.user-password').val();
                $.ajax({
                    beforeSend: function(request) {
                        request.setRequestHeader('X-CSRFToken', csrftoken);
                    },
                    method: 'POST',
                    url: '/login/',
                    data: {
                        "username": username,
                        "password": password
                    }

                }).done(function(data) {
                    console.log(data);
                    var id = data.match(/data-id="(\d+)/);
                    var user = parseInt(id[1]);
                    $('.confirm-btn').attr('data-owner', user);
                }).fail(function(data) {
                    alertStatus('oh no! try again');
                });
            });
            $('.close').click(function() {
                parent.location.reload();
            });
            $('.cancel-btn').click(function() {
                parent.location.reload();
            });
            $('.open-later').click(function() {
                parent.location.reload();
            });
        } else {
            var user = parseInt($('.user-id').data('id'));
            console.log(user);
            $('.buy-confirmation-container').css("width", "100%")
            $('.cost').html($(this).data('price'));
            $('.confirm-btn').attr('data-price', $(this).data('price'));
            $('.confirm-btn').attr('data-id', $(this).data('id'));
            $('.confirm-btn').attr('data-owner', user);
            $('.confirm-btn').attr('data-locker', $(this).data('locker'));
            $('.close').click(function() {
                $('.stock-wrapper').hide();
                $('.not-loggedin-container').css("width", "0%");
                $('.buy-confirmation-container').css("width", "0%");
                $('.buy-open-container').css("width", "0%");
            });
        }
        $('.confirm-btn').click(function() {
            var csrftoken = getCookie('csrftoken');
            var itemId = this.getAttribute('data-id');
            var user = this.getAttribute('data-owner');
            $('.open-now').attr('data-locker', $(this).data('locker'));
            console.log(csrftoken);
            $.ajax({
                beforeSend: function(request) {
                    console.log(csrftoken)
                    request.setRequestHeader('X-CSRFToken', csrftoken);
                },
                method: 'POST',
                url: '/api/purchases/',
                data: {
                    "item": itemId,
                    "buyer": user
                }
            }).done(function(data) {
                console.log(data);

                $('.buy-open-containter').css("width", "100%");
                console.log($(this).data('locker'));
                openLocker('.open-now', user);
            }).fail(function(data) {
                alertStatus("Item could not be purchased");
                console.log(data.responseText);
            });

        });

        $('.cancel-btn').click(function() {
            $('.not-loggedin-container').css("width", "0%");
            $('.buy-confirmation-container').css("width", "0%");
        });
        $('.open-later').click(function() {
            $('.not-loggedin-container').css("width", "0%");
            $('.buy-confirmation-container').css("width", "0%");
            setTimeout('parent.location.reload()', 100);
        });
        document.location.href = '/#/dashboard'
    });
}

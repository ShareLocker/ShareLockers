'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../js/router');
var getCookie = require('../js/getCookie');
var show = require('../js/show');
var showLists = require('../js/showLists');
var openLocker = require('../js/openLocker');
var alertStatus = require('../js/alertStatus');

module.exports = function() {

    $('.stock-button').click(function() {
        if ($('.user-id').html().length === 1) {
            $('.not-loggedin-container').css("width", "100%");
            $('.stock-wrapper').show();
            $('.lgn-button').click(function() {
                var csrftoken = getCookie('csrftoken');
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
                    setTimeout('parent.location.reload()', 500);
                }).fail(function(data) {
                    alertStatus('Unable to open at this time');
                    console.log(data);
                });
            });
            $('.close').click(function() {
                $('.stock-wrapper').hide();
                $('.not-loggedin-container').css("width", "0%");
            });
        } else {
            $('.stock-container').css("width", "100%");
        };

        var lockerId = $(this).attr('data-locker');
        console.log(lockerId);
        $.ajax({
            method: 'GET',
            url: '/api/owneditems/',
        }).done(function(data) {
            console.log(data);
            showLists(data, 'stock', '.item-select');
            $('.item-inventory').on('change', function() {
                $('.item-title').val($(".item-inventory option:selected").data('title'));
                $('.item-description').val($(".item-inventory option:selected").data('description'));
                $('.item-price').val($(".item-inventory option:selected").data('price'));
                $('.item-id').val($(".item-inventory option:selected").data('id'));
            });


            $('.item-stock').click(function(e) {
                openLocker('.item-stock', owner);
                e.stopPropagation();
                e.preventDefault();
                var data = new FormData();
                var file = $('.photo-input').get(0).files[0];
                var csrftoken = getCookie('csrftoken');
                var title = $('.item-title').val();
                var description = $('.item-description').val();
                var price = $('.item-price').val();
                var owner = $('.user-id').attr('data-id');
                var photo = $('.photo-input').val();
                console.log(photo);
                data.append('photo', file);
                data.append('title', title);
                data.append('description', description);
                data.append('price', price);
                data.append('owner', owner);
                data.append('locker', lockerId);

                if ($('.item-id').val() == 0) {
                    if (photo == 0) {
                        $.ajax({
                            beforeSend: function(request) {
                                console.log(csrftoken)
                                request.setRequestHeader('X-CSRFToken', csrftoken);
                            },
                            method: 'POST',
                            url: '/api/unlocks/',
                            data: {
                                "waiting": true,
                                "profile": owner,
                                "locker": lockerId
                            }
                        }).done(function(x) {
                            console.log(x);
                            alertStatus("Locker Open");
                            $.ajax({
                                beforeSend: function(request) {
                                    request.setRequestHeader('X-CSRFToken', csrftoken);
                                },
                                method: 'POST',
                                url: '/api/owneditems/',
                                data: {
                                    'title': title,
                                    'description': description,
                                    'price': price,
                                    'owner': owner,
                                    'locker': lockerId
                                }
                            }).done(function(data) {
                                setTimeout('parent.location.reload()', 500);
                            });
                        }).fail(function(data) {
                            console.log(data);
                            alertStatus("Unable to open at this time");
                        })

                    } else {
                        $.ajax({
                            beforeSend: function(request) {
                                request.setRequestHeader('X-CSRFToken', csrftoken);
                            },
                            method: 'POST',
                            url: '/api/unlocks/',
                            data: {
                                "waiting": true,
                                "profile": owner,
                                "locker": lockerId
                            }
                        }).done(function(x) {
                            alertStatus("Locker Open");
                            $.ajax({
                                beforeSend: function(request) {
                                    request.setRequestHeader('X-CSRFToken', csrftoken);
                                },

                                method: 'POST',
                                url: '/api/owneditems/',
                                data: data,
                                dataType: 'json',
                                processData: false, // Don't process the files
                                contentType: false
                            }).done(function(data) {
                                console.log(data);
                                setTimeout('parent.location.reload()', 500);
                            });
                        }).fail(function(data) {
                            alertStatus("Unable to open at this time");
                        })

                    }
                } else {
                    var itemId = $('.item-id').val();
                    if (photo == 0) {
                        $.ajax({
                            beforeSend: function(request) {
                                request.setRequestHeader('X-CSRFToken', csrftoken);
                            },
                            method: 'POST',
                            url: '/api/unlocks/',
                            data: {
                                "waiting": true,
                                "profile": owner,
                                "locker": lockerId
                            }
                        }).done(function(x) {
                            alertStatus("Locker Open");
                            $.ajax({
                                beforeSend: function(request) {
                                    request.setRequestHeader('X-CSRFToken', csrftoken);
                                },

                                method: 'PUT',
                                url: '/api/owneditems/' + itemId,
                                data: {
                                    'title': title,
                                    'description': description,
                                    'price': price,
                                    'owner': owner,
                                    'locker': lockerId
                                }
                            }).done(function(data) {
                                setTimeout('parent.location.reload()', 500);
                            });
                        }).fail(function(data) {
                            alertStatus("Unable to open at this time");
                        })

                    } else {
                        $.ajax({
                            beforeSend: function(request) {
                                request.setRequestHeader('X-CSRFToken', csrftoken);
                            },
                            method: 'POST',
                            url: '/api/unlocks/',
                            data: {
                                "waiting": true,
                                "profile": owner,
                                "locker": lockerId
                            }
                        }).done(function(x) {
                            alertStatus("Locker Open");
                            $.ajax({
                                beforeSend: function(request) {
                                    request.setRequestHeader('X-CSRFToken', csrftoken);
                                },
                                method: 'PUT',
                                url: '/api/owneditems/' + itemId,
                                data: data,
                                dataType: 'json',
                                processData: false, // Don't process the files
                                contentType: false
                            }).done(function(data) {
                                setTimeout('parent.location.reload()', 500);
                            });
                        }).fail(function(data) {
                            alertStatus("Unable to open at this time");
                        })

                    }

                }

            });
        });
    });

};

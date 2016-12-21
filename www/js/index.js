/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function setLang() {
    navigator.globalization.getPreferredLanguage(
        function (language) {    
           locale = language.value
           setTranslates(locale)
        },
        function () {
            return 'error'
        }
    );
}

function setTranslates(locale) {
    lang = new Object()
    switch(locale) {
    case 'ru': 
        localStorage.setItem("lang.model", 'Модель');
        localStorage.setItem("lang.price", 'Цена');
        localStorage.setItem("lang.name", 'Название');
        localStorage.setItem("lang.address", 'Адрес');
        localStorage.setItem("lang.phone", 'Телефон');
        localStorage.setItem("lang.auto", 'Автомобили');
        $("#back-button").text("НАЗАД");
        $("#nearest-button").text("НАЙТИ БЛИЖАЙШИЙ САЛОН");
        $("#preferences-button").text("НАСТРОЙКИ");
        $("#catalog-button").text("КАТАЛОГ");
        $(".menu-button").text("МЕНЮ");     
        $("#load_jqGridCars").text("ЗАГРУЗКА...");   
        break

    case 'ua':
        localStorage.setItem("lang.model", 'Модель');
        localStorage.setItem("lang.price", 'Цiна');
        localStorage.setItem("lang.name", 'Назва');
        localStorage.setItem("lang.address", 'Адреса');
        localStorage.setItem("lang.phone", 'Телефон');
        localStorage.setItem("lang.auto", 'Автомобiлi');
        $("#back-button").text("НАЗАД");
        $("#nearest-button").text("ЗНАЙТИ НАЙБЛИЖЧИЙ САЛОН");
        $("#preferences-button").text("НАЛАШТУВАННЯ");
        $("#catalog-button").text("КАТАЛОГ");
        $(".menu-button").text("МЕНЮ");
        $("#load_jqGridCars").text("ЗАГРУЗКА...");
        break

    case 'en-US':
        localStorage.setItem("lang.model", 'Model');
        localStorage.setItem("lang.price", 'Price');
        localStorage.setItem("lang.name", 'Name');
        localStorage.setItem("lang.address", 'Address');
        localStorage.setItem("lang.phone", 'Phone');
        localStorage.setItem("lang.auto", 'Cars');    
        $("#back-button").text("BACK");
        $("#nearest-button").text("FIND NEAREST SHOWROOM");
        $("#preferences-button").text("PREFERENCES");
        $("#catalog-button").text("CATALOG");
        $(".menu-button").text("MENU");
        $("#load_jqGridCars").text("LOADING...");
        break
    default:
        localStorage.setItem("lang.model", 'Модель');
        localStorage.setItem("lang.price", 'Цена');
        localStorage.setItem("lang.name", 'Название');
        localStorage.setItem("lang.address", 'Адрес');
        localStorage.setItem("lang.phone", 'Телефон');
        localStorage.setItem("lang.auto", 'Автомобили');
        $("#back-button").text("НАЗАД");
        $("#nearest-button").text("НАЙТИ БЛИЖАЙШИЙ САЛОН");
        $("#preferences-button").text("НАСТРОЙКИ");
        $("#catalog-button").text("КАТАЛОГ");
        $(".menu-button").text("МЕНЮ");
        $("#load_jqGridCars").text("ЗАГРУЗКА...");
        break
    }
}

function getCars(showroom) {

    if (!$("#gbox_jqGridCars").length)
    {
        console.log("init");
        $("#jqGridCars").jqGrid({
        url: 'https://car-catalogue.azurewebsites.net/models/' + showroom,
        mtype: "GET",
        datatype: "json",
        colModel: [
            { label:  localStorage.getItem("lang.model"), name: 'model', key: true, width: 150 },
            { label:  localStorage.getItem("lang.price"), name: 'price', width: 200 }
        ],
        width: 350,
        height: 500,
        pgbuttons : false,
        viewrecords : false,
        pgtext : "",
        pginput : false,
        loadComplete: function() {
            $("#jqGridCars").show();
            $("#gbox_jqGridCars").show();
        },
        });
    }
    else
    {
        console.log("reload");
        jQuery("#jqGridCars").setGridParam({url: 'https://car-catalogue.azurewebsites.net/models/' + showroom}).trigger("reloadGrid");
    }

    $("#gbox_jqGrid").hide();
    $("#gbox_jqGridNearest").hide();
    $("#nearest-button").hide();
    $("#back-button").show();
}

function getShowrooms() {
            $("#jqGrid").jqGrid({
            url: 'http://car-catalogue.azurewebsites.net/showrooms',
            mtype: "GET",
            datatype: "json",
            colModel: [
                { name: 'id', key: true, hidden: true },
                { label: localStorage.getItem("lang.name"), name: 'title', width: 100 },
                { label: localStorage.getItem("lang.address"), name: 'address', width: 150 },
                { label: localStorage.getItem("lang.phone"), name: 'phone', width: 100 },
                { label: localStorage.getItem("lang.auto"), name:'cars', width:60, sortable:false, search:false,
                    formatter:'dynamicLink', 
                    formatoptions:{
                        onClick: function (rowid) {
                            getCars(rowid)
                        },
                        url: function () {
                            return "#";
                        },
                        cellValue: function () {
                            return localStorage.getItem("lang.auto");
                        },
                    },
                }
            ],
            width: 350,
            height: 500,
            loadonce:true,
            pgbuttons : false,
            viewrecords : false,
            pgtext : "",
            pginput : false
        });
        $("#jqGridCars").hide();
        $("#jqGridNearest").hide();
        $("#back-button").hide();
        $("#gbox_jqGrid").show();
        $("#nearest-button").show();
}

function getNearest() {
    var onSuccess = function(position) {

        if (!$("#gbox_jqGridNearest").length)
        {
            $("#jqGridNearest").jqGrid({
            url: 'https://car-catalogue.azurewebsites.net/showroom' + '?x=' +  position.coords.longitude + '&y=' + position.coords.latitude,
            mtype: "GET",
            datatype: "json",
                colModel: [
                    { name: 'id', key: true, hidden: true },
                    { label: localStorage.getItem("lang.name"), name: 'title', width: 100 },
                    { label: localStorage.getItem("lang.address"), name: 'address', width: 150 },
                    { label: localStorage.getItem("lang.phone"), name: 'phone', width: 100 },
                    { label: localStorage.getItem("lang.auto"), name:'cars', width:60, sortable:false, search:false,
                        formatter:'dynamicLink', 
                        formatoptions:{
                            onClick: function (rowid, iRow, iCol, cellText, e) {
                                getCars(rowid)
                            },
                            url: function (cellValue, rowId, rowData) {
                                return "#";
                            },
                            cellValue: function (cellValue, rowId, rowData) {
                                return  localStorage.getItem("lang.auto");
                            },
                        },
                    }
                ],
            width: 350,
            height: 500,
            pgbuttons : false,
            viewrecords : false,
            pgtext : "",
            pginput : false,
            loadComplete: function() {
                $("#gbox_jqGridNearest").show();
                $("#jqGridNearest").show();
            },
            });
        }
        else
        {
            console.log("reload");
            jQuery("#jqGridNearest").setGridParam({url: 'https://car-catalogue.azurewebsites.net/showroom' + '?x=' + position.coords.longitude + '&y=' + position.coords.latitude}).trigger("reloadGrid");
        }
        $("#gbox_jqGridCars").hide();
        $("#gbox_jqGrid").hide();
        $("#nearest-button").hide();
        $("#back-button").show();

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function getMenu() {
        $("#catalog-section").hide();
        $("#preferences-section").hide();
        $("#menu-section").show();
}

function getCatalog() {
        $("#catalog-section").show();
        $("#menu-section").hide();
        getShowrooms()
}

function loadTheme() {
     var theme = localStorage.getItem("theme")
     $('body').css('background-color', theme);
}

function setTheme() {
     var theme =  $('input[type=radio]:checked').val()
     $('body').css('background-color', theme);
     localStorage.setItem("theme", theme)
}

function getPreferences() {
        $("#preferences-section").show();
        $("#menu-section").hide();
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        setLang();
    }
};

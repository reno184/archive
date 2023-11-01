export function queryString(name) {
    if (name !== "" && name !== null && name !== undefined) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(window.location.href);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    } else {
        var arr = location.href.split("/");
        return arr[arr.length - 1];
    }
};

export function debounce(callback, delay) {
    var timer;
    return function () {
        var args = arguments;
        var context = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, delay)
    }
}

export function ddToDms(lat, lng) {
    function _getDms(val) {
        var valDeg, valMin, valSec, result;
        val = Math.abs(val);
        valDeg = Math.floor(val);
        result = valDeg + "º";
        valMin = Math.floor((val - valDeg) * 60);
        result += valMin + "'";
        valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000;
        result += valSec + '"';
        return result;
    }

    var lat = lat;
    var lng = lng;
    var latResult, lngResult, dmsResult = [];
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    latResult = (lat >= 0) ? 'N' : 'S';
    latResult += _getDms(lat);
    lngResult = (lng >= 0) ? 'E' : 'W';
    lngResult += _getDms(lng);
    dmsResult.push(latResult);
    dmsResult.push(lngResult);
    /*  dmsResult = latResult + ' ' + lngResult;*/
    return dmsResult;
}

export function latDMS(lat) {
    function _getDms(val) {
        var valDeg, valMin, valSec, result;
        val = Math.abs(val);
        valDeg = Math.floor(val);
        result = valDeg + "º";
        valMin = Math.floor((val - valDeg) * 60);
        result += valMin + "'";
        valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000;
        result += valSec + '"';
        return result;
    }

    var latResult;
    lat = parseFloat(lat);
    latResult = (lat >= 0) ? 'N' : 'S';
    latResult += _getDms(lat);
    return latResult;
}

export function lngDMS(lng) {
    function _getDms(val) {
        var valDeg, valMin, valSec, result;
        val = Math.abs(val);
        valDeg = Math.floor(val);
        result = valDeg + "º";
        valMin = Math.floor((val - valDeg) * 60);
        result += valMin + "'";
        valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000;
        result += valSec + '"';
        return result;
    }
    var lngResult;
    lng = parseFloat(lng);
    lngResult = (lng >= 0) ? 'E' : 'W';
    lngResult += _getDms(lng);
    return lngResult;
}

window.__vibrantGdprWidgetCustomizer = (function () {
    var customImage;
    var customThemeColor;
    var setCustomThemeColor = function (themeColor) {
        customThemeColor = themeColor;
    };

    var setCustomImageSrc = function (customImageSrc) {
        customImage = customImageSrc;
    };

    var getCustomThemeColor = function () {
        return customThemeColor;
    };

    var getCustomImage = function () {
        return customImage;
    };
    return {
        setCustomThemeColor,
        setCustomImageSrc,
        getCustomThemeColor,
        getCustomImage
    }
})();
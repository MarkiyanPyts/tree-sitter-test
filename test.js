/* eslint-env jquery */

"use strict";

/**
* Initializes the image comparer by creating the script and stylesheet tags
*/

const initImageComparer = () => {
    const currentScriptTag = document.getElementById("image-comparer-api");

    if (!currentScriptTag) {
        const tag = document.createElement("script"), firstScriptTag = document.getElementsByTagName("script")[0];

        tag.id = "image-comparer-api";
        tag.src = "https://unpkg.com/image-compare-viewer/dist/image-compare-viewer.min.js";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const currentStylesheetTag = document.getElementById("image-comparer-styles");

    if (!currentStylesheetTag) {
        const tag = document.createElement("link"), firstScriptTag = document.getElementsByTagName("link")[0];

        tag.id = "image-comparer-api";
        tag.rel = "stylesheet";
        tag.href = "https://unpkg.com/image-compare-viewer/dist/image-compare-viewer.min.css";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
};

/**
* Initializes the image comparer by creating the script and stylesheet tags
*/

(function () {
    initImageComparer();

    $(".image-compare").each(async (_, element) => {
        const $imageComparer = $(element);
        const firstLabel = $imageComparer.data("first-label") || "";
        const secondLabel = $imageComparer.data("second-label") || "";

        const options = {

            // UI Theme Defaults

            controlColor: "#FFFFFF",
            controlShadow: true,
            addCircle: true,
            addCircleBlur: true,

            // Label Defaults

            showLabels: firstLabel && secondLabel ? true : false,
            labelOptions: firstLabel && secondLabel ? {
                before: firstLabel,
                after: secondLabel,
                onHover: false
            } : {},

            // Smoothing

            smoothing: true,
            smoothingAmount: 100,

            // Other options

            hoverStart: false,
            verticalMode: false,
            startingPoint: 50,
            fluidMode: false
        };

        //The script of the library may not be loaded at the time of this code execution, so we try to await for it in case of error.
        let ableToCreate = false;
        let tries = 0;

        while (tries < 5 && !ableToCreate) {
            try {
                new window.ImageCompare(element, options).mount();
                ableToCreate = true;
                return;
            } catch (e) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                tries++;
            }
        }

        if (!ableToCreate) {
            throw new Error("Not able to mount the Image comparer, the package may have been removed.");
        }
    });
})();


(function() {
    CKEDITOR.plugins.add('fastimage', {
        lang: 'en',
        requires: 'dialog',
        icons: 'fastimage',
        draw: function(ev) {
            alert('test');
            var ctx = document.getElementById('canvas').getContext('2d'),
                    img = new Image(),
                    f = document.getElementById("uploadimage").files[0],
                    url = window.URL || window.webkitURL,
                    src = url.createObjectURL(f);

            img.src = src;
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                url.revokeObjectURL(src);
            };
        },
        init: function(editor) {
            CKEDITOR.dialog.add('fastimage', function() {
                return {
                    title: 'Upload a new image',
                    minWidth: 400,
                    minHeight: 400,
                    contents: [
                        {
                            id: 'tab-basic',
                            label: 'Basic Settings',
                            elements: [
                                {
                                    type: 'html',
                                    html: "<div><input type='file' name='img' size='65' id='uploadimage' onchange='fastimage.draw(this)' value='test'></div>"+
                                        '<canvas id="canvas" width="400" height="400"></canvas>'
                                }
                            ]
                        }
                    ],
                    onShow: function(event) {
                    }
                };
            });
            editor.addCommand('uploadimage', new CKEDITOR.dialogCommand('fastimage', {
            }));
            editor.ui.addButton('fastimage', {
                label: 'Upload image',
                command: 'uploadimage',
                toolbar: 'fastimage'
            });
        }
    });

})();
fastimage = {
    draw: function(element) {
        var ctx = document.getElementById('canvas').getContext('2d'),
                img = new Image(),
                f = element.files[0],
                url = window.URL || window.webkitURL,
                src = url.createObjectURL(f);

        img.src = src;
        img.onload = function() {
            ctx.clearRect ( 0 , 0 , 400 , 400 );
            ctx.drawImage(img, 0, 0);
            url.revokeObjectURL(src);
        };
    }
};

CKEDITOR.config.image_removeLinkByEmptyURL = true;

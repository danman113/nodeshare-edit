# nodeshare-edit

A nodeshare version for development!

## Summary
To run nodeshare-edit, simply run "nodeshare" on whatever directory you want to share!

## Settings
You can set the port with the command line option "nodeshare --port=80"

You can also set the config JSON file with "nodeshare --config=PATHTOJSON"

### Custom JSON
`port`: Default port that nodeshare will run if not specified.

`filebrowser`: Location of the file that will be formatted and sent when a request to a folder is made. If the path is relative, it must be relative to the public folder. Otherwise it must be an absolute path.

`theme`: Default theme of the editor. Look up "Ace editor themes" for more themes. Add them to "public/ace" if you want to add external themes.

`default_edit`: The default editing mode of the editor. Can be set to something such as 'javascript' to enable syntax highlighting to unknown filetypes.

`public_token`: As nodeshare-edit keeps filepaths identical to the filepath in your system, it needs a special path for resources it needs to function, such as the editor and stylesheets. This can be used to change which path that is. For example, if you have a folder called "test" in your default directory, if you set the public_token to "test", you may get some issues. If test is unspecified in the JSON, it will make a random one for you.

`restricted`: A list of restricted filetypes. Files ending with these will not be sent.

`languages`: A hash of filetypes and the associated modes with them. If a filetype ends with one of the lefthand elements, the mode will be set to the righthand element.

## Custom Filebrowsers
Nodeshare-edit contains a simple template system to allow you to customize how the filebrowser looks to suite your taste!

### Repeaters:
`$$(filespace)$$`: Everything between the $$'s will be repeated for every file and
folder in the currently selected folder. All other elements will only work inside
the filespace

### Replace:
`##path##`: Will be replaced with whatever directory the 'public_token' is. Basically makes stuff in the "public" folder show up.

`##filename##`: Will be replaced with the filename

`##filesize##`: Will be replaced with filesize

### Conditionals:
`##file##(html)##file##`: Everything in-between the two ##files##'s will only appear
when the current filespace belongs to a file.

`##folder##(html)##folder##`: Same as above, but for folders.

### Attributes:
`data-delete`: Will request to delete file inside attribute

`data-target`: Will toggle in the matching data-slide element.

`data-slide`: Element will slide into view when above is clicked.

# adapt-odi-licence

Adds the relevant content licence and pop up content (using tutor) to adapt 2 modules.

## Authoring tool installation

Ddownload repository as a zip file and import the extension into the adapt authoring tool (v0.2.0+). In the authoring tool you can configure the extension from the configuration settings screen of a page on a course. 

## Command-line installation

Get the code directly from GitHub, either downloading the zip file or cloning the repository.

To play around with it, the easiest thing is to create a course:

```
 adapt create course myTestCourse
 cd myTestCourse
 grunt build
 cd src/extensions
 git clone https://github.com/theodi/adapt-odi-licence
```

The configuration shown in the example.json file is strait forward.

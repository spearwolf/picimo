
Best Practices: WebGL Vertex Data
---------------------------------

### General Links

- https://developer.mozilla.org/de/docs/Web/API/WebGL_API/WebGL_best_practices
- https://www.khronos.org/opengl/wiki/Vertex_Specification_Best_Practices
- https://developer.apple.com/library/content/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/TechniquesforWorkingwithVertexData/TechniquesforWorkingwithVertexData.html
- https://www.khronos.org/registry/webgl/specs/latest/
- https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html
- enableVertexAttribArray
  - http://stackoverflow.com/questions/12427880/is-it-important-to-call-gldisablevertexattribarray
  - http://stackoverflow.com/questions/36288389/when-should-i-enable-disable-vertex-position-attributes-in-webgl-opengl
  - http://stackoverflow.com/questions/9705771/conflict-when-using-two-or-more-shaders-with-different-number-of-attributes?rq=1


## Vertex Attributes Alignment Hints

from https://groups.google.com/forum/#!topic/webgl-dev-list/lAXfVGRoCzg

```
3-byte attributes should be 4-byte aligned. (e.g. 3 x unsigned byte)
6-byte attributes should be 4-byte aligned. (e.g. 3 x short int)

2-byte components should be 2-byte aligned.
4-byte components should be 4-byte aligned.
```


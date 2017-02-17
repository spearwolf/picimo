
Best Practices: WebGL Vertex Data
---------------------------------

### General Links

- https://www.khronos.org/opengl/wiki/Vertex_Specification_Best_Practices
- https://developer.apple.com/library/content/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/TechniquesforWorkingwithVertexData/TechniquesforWorkingwithVertexData.html
- https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html


## Vertex Attributes Alignment Hints

from https://groups.google.com/forum/#!topic/webgl-dev-list/lAXfVGRoCzg

```
3-byte attributes should be 4-byte aligned. (e.g. 3 x unsigned byte)
6-byte attributes should be 4-byte aligned. (e.g. 3 x short int)

2-byte components should be 2-byte aligned.
4-byte components should be 4-byte aligned.
```


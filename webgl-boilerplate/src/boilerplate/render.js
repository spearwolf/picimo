
export default function render ({ program, glx, gl, voPool, sCtx }, parameters) {

    parameters.time = new Date().getTime() - parameters.start_time;

    // Update shader context

    sCtx.curUniform('time').value = parameters.time / 1000;
    sCtx.curUniform('resolution').value = [ parameters.screenWidth, parameters.screenHeight ];

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    // Load program into GPU

    const currentProgram = glx.resourceLibrary.loadProgram( program );

    currentProgram.use();
    currentProgram.loadUniforms( sCtx );

    // Render geometry

    const buffer = glx.resourceLibrary.findBuffer(voPool);

    buffer.bindBuffer();
    currentProgram.attributes.position.vertexAttribPointer( voPool.descriptor );

    gl.enableVertexAttribArray( currentProgram.attributes.position.location);

    gl.drawArrays( gl.TRIANGLES, 0, 12 );

    gl.disableVertexAttribArray( currentProgram.attributes.position.location );

}


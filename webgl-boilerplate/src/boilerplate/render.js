
export default function render({ currentProgram, gl, buffer }, parameters) {

    if ( !currentProgram ) return;

    parameters.time = new Date().getTime() - parameters.start_time;

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    // Load program into GPU

    currentProgram.use();

    // Set values to program variables

    currentProgram.uniforms.time.setValue( parameters.time / 1000 );
    currentProgram.uniforms.resolution.setValue( [ parameters.screenWidth, parameters.screenHeight ] );

    // Render geometry

    buffer.bindBuffer();

    currentProgram.attributes.position.vertexAttribPointer( buffer.voPool.descriptor );
    gl.enableVertexAttribArray( currentProgram.attributes.position.location);
    gl.drawArrays( gl.TRIANGLES, 0, 12 );
    gl.disableVertexAttribArray( currentProgram.attributes.position.location );

}


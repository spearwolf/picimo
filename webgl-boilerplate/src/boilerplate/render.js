
export default function render({ currentProgram, gl, timeLocation, resolutionLocation, positionLocation, buffer }, parameters) {

    if ( !currentProgram ) return;

    parameters.time = new Date().getTime() - parameters.start_time;

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    // Load program into GPU

    gl.useProgram( currentProgram );

    // Set values to program variables

    gl.uniform1f( timeLocation, parameters.time / 1000 );
    gl.uniform2f( resolutionLocation, parameters.screenWidth, parameters.screenHeight );

    // Render geometry

    buffer.bindBuffer();
    gl.vertexAttribPointer( positionLocation, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLocation );
    gl.drawArrays( gl.TRIANGLES, 0, 12 );
    gl.disableVertexAttribArray( positionLocation );

}


import VODescriptor from '../../src/core/v_o_descriptor';
import VOPool from '../../src/core/v_o_pool';
import WebGlContext from '../../src/render/web_gl_context';
import WebGlBuffer from '../../src/render/web_gl_buffer';

export default function ({ gl }) {

    const voDescriptor = new VODescriptor({
        vertexCount: 3, // => triangle
        attributes: [
            { name: 'position',  type: 'float32', size: 2, attrNames: [ 'x', 'y' ] },
        ]
    });

    const voPool = new VOPool(voDescriptor, { capacity: 4 });

    voPool.alloc().setPosition( -1.0, -1.0, 0.49, -1.0, -1.0,  1.0 );
    voPool.alloc().setPosition( 0.49, -1.0, 0.49,  1.0, -1.0,  1.0 );

    voPool.alloc().setPosition( 0.5, -1.0, 1.0, -1.0, 0.5,  1.0 );
    voPool.alloc().setPosition( 1.0, -1.0, 1.0,  1.0, 0.5,  1.0 );

    const glx = new WebGlContext(gl);
    const buffer = new WebGlBuffer(glx, WebGlBuffer.ARRAY_BUFFER, WebGlBuffer.STATIC_DRAW);
    buffer.bufferData(voPool);

    return {
        voPool,
        buffer
    };
}


'use client'

import React, { useState } from 'react';

const OperatingAreas = () => {

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div></div>
                            <div className="d-inline-block text-center">
                                <h4>Our Operating Areas</h4>
                                <hr/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 text-center m-2">
                            Davis County, Morgan County, Salt Lake County, Tooele County, Summit County, Utah County, Wasatch County, Juab County, Sanpete County, Carbon County
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="row mt-1">
                                <div className="col-12 col-sm-12">

                                    <img 
                                        src='/operating_areas.png'
                                        className='img-fluid'
                                    />

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
                
        </>
    );
};

export default OperatingAreas;

import {Image} from "antd";

export const Gallery = (props) => {
    return (
        <div id='portfolio' className='text-center'>
            <div className='container'>
                <div className='section-title'>
                    <h2>HOẠT ĐỘNG</h2>
                </div>
                <div className='row'>
                    <div>
                        {props.data
                            ? props.data.map((d, i) => {
                                const { title, largeImage, smallImage } = d
                            return <div className='col-sm-6 col-md-4 col-lg-4'>
                            <Image
                            src={largeImage}
                            className='img-responsive'
                            height={220}
                            width={360}
                            style={{borderRadius: "8px"}}
                            alt={title}
                            />
                            </div>
                        })
                            : 'Loading...'}
                    </div>
                </div>
            </div>
        </div>
    )
}

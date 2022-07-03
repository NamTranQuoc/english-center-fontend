export const Services = (props) => {
    return (
        <div id='services' className='text-center' style={{borderRadius: "8px"}}>
            <div className='container'>
                <div className='section-title'>
                    <h2>PHẢN HỒI</h2>
                    <p>
                        Cảm ơn những yêu thương DÀNH CHO PMP ENGLISH
                    </p>
                </div>
                <div className='row'>
                    {props.data
                        ? props.data.map((d, i) => (
                            <div key={`${d.name}-${i}`} className='col-md-4'>
                                <div className='testimonial'>
                                    <div className='testimonial-image'>
                                        {' '}
                                        <img src={d.img} alt='' />{' '}
                                    </div>
                                    <div className='testimonial-content'>
                                        <p>"{d.text}"</p>
                                        <div className='testimonial-meta' style={{color: "#FFFFFF"}}> - {d.name} </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        : 'loading'}
                </div>
            </div>
        </div>
    )
}

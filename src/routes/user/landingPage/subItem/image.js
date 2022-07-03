export const Image = ({ title, largeImage, smallImage }) => {
    return (
        <div className='portfolio-item'>
            <div className='hover-bg'>
                {' '}
                    <div className='hover-text'>
                        <h4>{title}</h4>
                    </div>
                    <img
                        src={largeImage}
                        className='img-responsive'
                        height={200}
                        alt={title}
                    />{' '}

            </div>
        </div>
    )
}

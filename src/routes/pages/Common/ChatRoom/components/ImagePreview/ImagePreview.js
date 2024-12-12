import './ImagePreview.css';

const ImagePreview = ({
    images,

    clearSelectPicture,
    sendSelectPicture,
}) => {
    return (
        <div className="chat-image-preview-container">
            <div className="image-preview-buttons">
                <div></div>
                <span>사진을 전송하시겠습니까?</span>
                <button
                    className="close-image-preview"
                    onClick={clearSelectPicture}
                >
                    X
                </button>
            </div>
            <div className="chat-image-preview-wrap">
                {
                    images?.map((image, idx) => (
                        <div className="image-preview-box">
                            <img
                                className='chat-image'
                                src={URL.createObjectURL(image)}
                                alt='미리보기 이미지'
                                key={`chat-image-${idx}`}
                            />
                        </div>
                    ))
                }
            </div>
            <div
                className="send-button"
                onClick={sendSelectPicture}
            >
                전송
            </div>
        </div>
    )
};

export default ImagePreview;
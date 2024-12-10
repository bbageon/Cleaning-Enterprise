import { useNavigate } from 'react-router-dom';
import './ChatImage.css';

import Modal from 'react-modal';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useState } from 'react';

Modal.setAppElement('#root');

const ChatImage = ({
    imageMessage,
}) => {
    const images = imageMessage.substring(2, imageMessage.length - 2).split(',');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // 이미지 클릭 핸들러
    const openImageModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    return (
        <div
            className={`chat-image-ballon-wrap`}
        >
            <div className="chat-image-ballon-grid">
                {
                    images?.map(image => (
                        <div className="chat-image-ballon">
                            <img
                                src={image}
                                className={`chat-image`}
                                onClick={() => openImageModal(image)}
                            />
                        </div>
                    ))
                }
            </div>

            {/* 이미지 모달 */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeImageModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                    },
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        background: "transparent",
                        border: "none",
                    },
                }}
            >
                {selectedImage && (
                    <Zoom>
                        <img
                            src={selectedImage}
                            alt="Zoomed Chat Image"
                            style={{
                                maxWidth: "90vw",
                                maxHeight: "90vh",
                                borderRadius: "8px",
                            }}
                        />
                    </Zoom>
                )}
            </Modal>
        </div>
    )
}

export default ChatImage;
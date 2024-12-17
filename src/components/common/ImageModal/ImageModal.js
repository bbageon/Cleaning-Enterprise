import Modal from 'react-modal';

const ImageModal = ({
    isOpen,
    onClose,
    imageUrl,
}) => {

    /* ===== STYLES ===== */
    const styles = {
        modal: {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
                border: 'none',
            },
        },
        img: {
            maxWidth: '90vw',
            maxHeight: '90vh',
        },
    };

    /* ===== RENDER ===== */
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={{ ...styles.modal }}
            >
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Zoomed Chat Image"
                        style={{ ...styles.img }}
                    />
                )}
            </Modal>
        </>
    );
};

export default ImageModal;
import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal, { modalUnstyledClasses } from '@mui/material/Modal';
import FloatingActionButtonZoom from './switch';
import { AuthContext } from "../../context/authContext";
import { useLocation } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4,
    color:'red'
};

export default function BasicModal() {
    const {pathname}=useLocation()
    const {token, logout, openLoginPopup, setOpenLoginPopup,currentUser} = useContext(AuthContext);
const isHomePage=pathname==="/Home";
    const handleOpen = () => setOpenLoginPopup(true);
    const handleClose = () => setOpenLoginPopup((isHomePage&&token)?false:true)

    return (
        <div>{token?<Button className="logButton" onClick={logout} >Hi {currentUser.userName}! Log Out </Button>
        :<>
            <Button className="logButton" onClick={handleOpen}>Log In</Button>
            <Modal
                open={openLoginPopup}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FloatingActionButtonZoom close={handleClose}></FloatingActionButtonZoom>
                </Box>
            </Modal>
            </>}
        </div>
        
    );
    
}

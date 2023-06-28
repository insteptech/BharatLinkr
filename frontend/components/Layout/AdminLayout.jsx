import React from 'react'
import { Container, Row } from 'react-bootstrap'
import LeftMenuPage from '../admin/LeftMenu'
import Header from './Header'

export default function AdminLayout({ children }) {
    return (
        <div className="main_body_bg">
            <Container className="result_container_padding">
                <Row>
                    <div className="col-lg-1 col-md-2 col-0 mobile_leftmenu">
                        <LeftMenuPage />
                    </div>
                    <div className="col-lg-11 col-md-10 col-12">
                        <Row>
                            <div className="header_padding header_bg">
                                <Header />
                            </div>
                        </Row>
                        <Row>
                            <div className="header_padding">
                                {children}
                            </div>
                        </Row>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

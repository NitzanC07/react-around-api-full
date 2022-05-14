import React, { useState, useEffect } from 'react';

function Footer() {

    const [year, setYear] = useState('');

    useEffect(() => {
        const currentYear = new Date().getFullYear()
        setYear(currentYear)
    }, [])

    return(
        <footer className="footer">
            <p className="footer__copyright">&copy; {year} Around The U.S.</p>
        </footer>
    )
}

export default Footer
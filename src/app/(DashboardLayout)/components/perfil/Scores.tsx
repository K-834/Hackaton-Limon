export const Scores = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            margin: '1rem 0',
            padding: '0.5rem 0'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '0.25rem',
                borderRadius: '1rem',
                width: '50%',
                height: '8rem',
                margin: '0 0.25rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%'
                }}>
                    <div style={{
                        backgroundColor: '#fde68a',
                        padding: '1.25rem',
                        borderRadius: '0.75rem',
                        marginRight: '2rem'
                    }}>
                        <span style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold'
                        }}>⚡</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: '2.5rem'
                        }}>60</span>
                        <p>Exp. Totales</p>
                    </div>
                </div>
            </div>
            <div style={{
                backgroundColor: 'white',
                padding: '0.5rem',
                borderRadius: '1rem',
                width: '50%',
                height: '8rem',
                margin: '0.25rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
                <div>
                    <img src="C:\Users\angel\hackathon\profile\public\descubridores.png" alt="clan" />
                </div>
            </div>
        </div>
    );
}
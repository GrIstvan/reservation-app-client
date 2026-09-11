import type { ServiceProvider } from '../../serviceProvider';
import  "./serviceDescription.css"


function ServiceDiscription({ serviceProvider }: { serviceProvider: ServiceProvider | null }) {

    if (!serviceProvider) {
        return null
    }
    console.log(serviceProvider?.cover_image)

    return (
        <div className="detaild-description-container">
               <div className="left-side">
                <img
                    key={serviceProvider.cover_image}
                    src={serviceProvider.cover_image}
                    alt={serviceProvider.name}
                    onError={(e) => {
                        e.currentTarget.src = '/fallback.png'
                    }}
                    className="provider-image"
                />
            </div>
            <div className="right-row"><span>{serviceProvider?.name}</span><span>{serviceProvider?.adress}</span></div>
            <div className="right-row">{serviceProvider?.description}</div>
            <div className="right-row"><span>Tel: {serviceProvider?.phone}</span><span>Email: {serviceProvider?.email}</span></div>
        </div>
    )
}

export default ServiceDiscription
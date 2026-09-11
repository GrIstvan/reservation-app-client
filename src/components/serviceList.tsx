import { useState } from 'react'
import './serviceList.css'
import CustomButton from './button/button'
import type { ServiceProvider } from '../serviceProvider.ts'


function ServiceList({ serviceList, selectCallback, loadMoreCallback, isLastPage }:
    {
        serviceList: Array<ServiceProvider>,
        selectCallback: (sprov: ServiceProvider) => void,
        loadMoreCallback: (pageIdx: number) => void,
        isLastPage: boolean
    }) {
    const [pageIdx, setPageIdx] = useState<number>(0)
    return (
        <div className='list-container'>
            <ul>
                {(serviceList || []).map(s => <li key={s.id} onClick={() => selectCallback(s)}>{s.name}</li>)}
                {isLastPage == false && <li><CustomButton onClick={() => {
                    const nextPage = pageIdx + 1;
                    setPageIdx(nextPage);
                    loadMoreCallback(nextPage);
                }}></CustomButton></li>}
            </ul>
        </div>
    )
}

export default ServiceList
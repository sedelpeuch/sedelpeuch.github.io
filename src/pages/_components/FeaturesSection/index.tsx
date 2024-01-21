import React from 'react'
import clsx from 'clsx'

import styles from './styles.module.scss'
import features, {type FeatureItem} from '@site/data/features'
import SectionTitle from '../SectionTitle'

function Feature({title, Svg, text}: FeatureItem) {
    return (
        <div className={clsx('col', styles.feature)}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <div className="text--left padding-horiz--md">
                <h3>{title}</h3>
                <div style={{width: '100%'}}>
                    {text}
                </div>
            </div>
        </div>
    )
}

export default function FeaturesSection(): JSX.Element {
    return (
        <section className={clsx(styles.featureContainer, 'container padding-vert--sm')}>
            <SectionTitle icon={'ri:map-pin-user-line'}>
                Activités
            </SectionTitle>
            <div className={clsx('row', styles.features)}>
                {features.map((props, idx) => (
                    <Feature key={idx} {...props} />
                ))}
            </div>
        </section>
    )
}

import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import { EN, ISV } from 'consts'

import { t } from 'translations'

import { langAction } from 'actions'

import { useDictionaryLanguages, useLang } from 'hooks'

import { Selector } from 'components'

import './LangSelector.scss'

import DirectionIcon from './images/direction-icon.svg'

interface ILangPart {
    dir: string;
    lang: string;
    onSelect: (lang: string) => void;
}

const LangPart =
    ({ lang, dir, onSelect }: ILangPart) => {
        const langs = useDictionaryLanguages()

        if (lang === ISV) {
            return (
                <div className="lang-selector__isv">
                    {t('isvLang')}
                </div>
            )
        }

        const options = [EN, ...langs].map((value) => ({
            name: t(`${value}Lang`),
            value,
        }))

        return (
            <Selector
                testId="lang-selector"
                className="lang-selector__another"
                label={dir}
                hideLabel
                options={options}
                value={lang}
                onSelect={(value: string) => {
                    if (dir === 'from') {
                        onSelect(value)
                    }
                    if (dir === 'to') {
                        onSelect(value)
                    }
                }}
            />
        )
    }

export const LangSelector =
    () => {
        const { from, to } = useLang()
        const dispatch = useDispatch()

        return (
            <div className="lang-selector">
                <LangPart
                    dir="from"
                    lang={from}
                    onSelect={(value) => dispatch(langAction({
                        from: value,
                        to,
                    }))}
                />
                <button
                    data-testid="change-direction"
                    type="button"
                    aria-label="Change translation direction"
                    className={classNames('lang-selector__change-dir-button', { rotate: from === ISV })}
                    onClick={() => dispatch(langAction({
                        from: to,
                        to: from,
                    }))}
                >
                    <DirectionIcon />
                </button>
                <LangPart
                    dir="to"
                    lang={to}
                    onSelect={(value) => dispatch(langAction({
                        from,
                        to: value,
                    }))}
                />
            </div>
        )
    }

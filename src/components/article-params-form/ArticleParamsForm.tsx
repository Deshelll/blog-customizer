import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	defaultArticleState,
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleProp = {
	optionState: ArticleStateType;
	onSetOptions: (option: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	optionState,
	onSetOptions,
}: ArticleProp) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formOptions, setFormOptions] = useState<ArticleStateType>({
		...optionState,
	});
	const ref = useRef<HTMLDivElement | null>(null);

	const handleClickArrowButton = () => {
		setIsOpen(isOpen ? false : true);
	};

	const openContainer = clsx(styles.container, isOpen && styles.container_open);

	const handleChangeOption = <T extends keyof ArticleStateType>(
		key: T,
		value: ArticleStateType[T]
	) => {
		setFormOptions((prevState) => ({ ...prevState, [key]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSetOptions(formOptions);
	};

	const handleReset = () => {
		setFormOptions(defaultArticleState);
		onSetOptions(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: ref,
		onChange: setIsOpen,
		onClose() {
			setIsOpen(false);
		},
	});

	return (
		<>
			<div ref={ref}>
				<ArrowButton isOpen={isOpen} onClick={handleClickArrowButton} />
				<aside className={openContainer}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text uppercase={true} weight={800} size={31} as={'h2'}>
							Задайте параметры
						</Text>

						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formOptions.fontFamilyOption}
							onChange={(value) =>
								handleChangeOption('fontFamilyOption', value)
							}
						/>
						<RadioGroup
							title='Размер Шрифта'
							options={fontSizeOptions}
							selected={formOptions.fontSizeOption}
							name='fontSize'
							onChange={(value) => handleChangeOption('fontSizeOption', value)}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formOptions.fontColor}
							onChange={(value) => handleChangeOption('fontColor', value)}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formOptions.backgroundColor}
							onChange={(value) => handleChangeOption('backgroundColor', value)}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formOptions.contentWidth}
							onChange={(value) => handleChangeOption('contentWidth', value)}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};

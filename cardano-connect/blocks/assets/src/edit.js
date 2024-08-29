/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {CheckboxControl, TextareaControl} from '@wordpress/components';
import { __experimentalNumberControl as NumberControl } from "@wordpress/components";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {JSX.Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	return (
		<div { ...useBlockProps() }>
			<div className={'assets-control'}>
				{isSelected ? (
					<>
						<TextareaControl
							label={__('Whitelist Policy ID`s')}
							help={__('(One Policy ID per line)')}
							value={attributes.whitelist}
							onChange={(nextValue) => setAttributes({whitelist: nextValue})}
						/>
						<NumberControl
							label={__('Items per page')}
							help={__('(Set to 0 to disable pagination)')}
							value={attributes.perpage}
							min={0}
							max={10000000}
							step={1}
							onChange={(nextValue) => setAttributes({perpage: parseInt(nextValue)})}
						/>
						<div style={{ marginTop: 20 }}>
							<CheckboxControl
								label={__('Hide titles?')}
								onChange={(nextValue) => setAttributes({hide_titles: !!nextValue})}
								checked={!!attributes.hide_titles}
								value={'hide_titles'}
							/>
						</div>
					</>
				) : (
					<>
						{attributes.whitelist ? (
							<div>
								<div className={'assets-title'}>
									<div className={'assets-image'}></div>
									<div className={'assets-text'}>
										{__('Filtered assets by Policy ID')}
									</div>
								</div>
								<div className={'assets-attribute'}>{attributes.whitelist}</div>
							</div>
						) : (
							<div className={'assets-title'}>
								<div className={'assets-image'}></div>
								<div className={'assets-text'}>
									{ __('All wallet assets') }
								</div>
							</div>
						)}
						<div className={'assets-placeholder'}></div>
					</>
				)}
			</div>
		</div>
	);
}

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
			<div className={'pools-control'}>
				{isSelected ? (
					<>
						<TextareaControl
							label={__('Whitelist Pool ID(s)')}
							help={__('(Filter the list of pools by one or more pool ID(s). Enter one Pool ID per line)')}
							value={attributes.whitelist}
							onChange={(nextValue) => setAttributes({whitelist: nextValue})}
						/>
						<NumberControl
							label={__('Pools per page')}
							help={__('(Set to 0 to disable pagination, max 100)')}
							value={attributes.per_page}
							min={0}
							max={100}
							step={1}
							onChange={(nextValue) => setAttributes({per_page: parseInt(nextValue)})}
						/>
						<br/>
						<TextareaControl
							label={__('Not found text')}
							help={__('(Replaces default options not found text with a custom message for this block)')}
							value={attributes.not_found}
							onChange={(nextValue) => setAttributes({not_found: nextValue})}
						/>
					</>
				) : (
					<>
						{attributes.whitelist ? (
							<div>
								<div className={'pools-title'}>
									<div className={'pools-image'}></div>
									<div className={'pools-text'}>
										{__('Filtered Pools by ID(s)')}
									</div>
								</div>
								<div className={'pools-attribute'}>{attributes.whitelist}</div>
							</div>
						) : (
							<div className={'pools-title'}>
								<div className={'pools-image'}></div>
								<div className={'pools-text'}>
									{__('All pools')}
								</div>
							</div>
						)}
						<div className={'pools-placeholder'}></div>
						<div className={'pools-placeholder'}></div>
					</>
				)}
			</div>
		</div>
	);
}

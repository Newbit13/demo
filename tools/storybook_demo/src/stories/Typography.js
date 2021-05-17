import PropTypes from 'prop-types';
import './typography.css';
import {cs} from '../utils/className'

/**
 * 文本的基本格式。
 */ 
export const Typography = ({del}) => {
    return (
        <div
            className={cs({del:del})}
        >123</div>
    );
};

Typography.propTypes = {
    /**
     * 是否显示删除线
    */
    del: PropTypes.bool,
};

Typography.defaultProps = {
    del: false,
  };
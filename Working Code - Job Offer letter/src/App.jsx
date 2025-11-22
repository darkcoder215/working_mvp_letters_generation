import React, { useState, useRef, useEffect } from 'react';

const JobOfferDocument = () => {
  const documentRef = useRef(null);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showAlignmentGuides, setShowAlignmentGuides] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  
  // Custom fonts
  const [customFonts, setCustomFonts] = useState({
    sans: null,
    serif: null,
    display: null
  });

  // Form state with fillable fields
  const [formData, setFormData] = useState({
    candidateName: 'أيمن',
    jobTitle: 'مدير محتوى',
    level: 'مستوى I',
    levelNumber: '2',
    team: 'التطوير التنظيمي',
    department: 'ثقافة المنظومة',
    management: 'الموارد البشرية',
    contractCity: 'الرياض',
    workType: 'كامل',
    directManager: 'أسيل باعبدالله',
    greetingIcon: '👋🏻',
    accentColor: '#03BB6E',
    responsibilities: [
      'إدارة وتنفيذ قسم ومهام "إدارة المواهب والتطوير التنظيمي" بالكامل.',
      'تطوير وتنفيذ سلم الرواتب والمستويات داخلها بما يتناسب مع "ثمانية" ومتغيرات السوق.',
      'تطوير وتنفيذ تقييم الأداء، بداية من التقييم الدوري إلى خطة التطوير.',
      'المساعدة في بناء مؤشرات الأداء لضمان تحقيق الأهداف الفردية والتنظيمية.',
      'بناء مسار مهني لكل قسم، مع الوصف الوظيفي المناسب.',
      'تطوير دليل ومعايير المسميات.',
      'تنفيذ الترقيات والعلاوات.'
    ]
  });

  // Element positions with width/height tracking
  const [positions, setPositions] = useState({
    topAccent: { left: -18.28, top: -13.11, width: 661.48, height: 27.65 },
    blackElement: { left: 40, top: 766, width: 32, height: 36 },
    greeting: { left: 374.5, top: 83, width: 180, height: 40 },
    greetingText: { left: 420, top: 88, width: 120, height: 32 },
    intro: { left: 48, top: 138, width: 499, height: 50 },
    jobTitle: { left: 37, top: 204, width: 510, height: 65 },
    jobTitleLabel: { left: 250, top: 216, width: 100, height: 21 },
    jobTitleValue: { left: 200, top: 238, width: 300, height: 21 },
    levelBox: { left: 37, top: 278, width: 160, height: 143 },
    teamBox: { left: 203, top: 278, width: 344, height: 69 },
    cityBox: { left: 203, top: 352, width: 344, height: 69 },
    expectations: { left: 226, top: 455, width: 320, height: 30 },
    responsibilities: { left: 101, top: 509, width: 446, height: 150 }
  });

  // Icon/Image uploads
  const [uploadedIcons, setUploadedIcons] = useState({
    greeting: null
  });

  const levels = [
    { ar: 'خبير', en: 'Staff', num: '5' },
    { ar: 'أول', en: 'Senior', num: '4' },
    { ar: 'مستوى II', en: 'Level II', num: '3' },
    { ar: 'مستوى I', en: 'Level I', num: '2' },
    { ar: 'مبتدئ', en: 'Junior', num: '1' }
  ];

  // Component dimensions that update with positions
  const getComponents = () => [
    { name: 'الإطار الرئيسي', ...positions.topAccent, elementId: 'topAccent', type: 'decoration' },
    { name: 'العنصر الأسود', ...positions.blackElement, elementId: 'blackElement', type: 'decoration' },
    { name: 'أيقونة الترحيب', ...positions.greeting, elementId: 'greeting', type: 'icon' },
    { name: 'نص الترحيب', ...positions.greetingText, elementId: 'greetingText', type: 'text' },
    { name: 'نص المقدمة', ...positions.intro, elementId: 'intro', type: 'text' },
    { name: 'صندوق المسمى الوظيفي', ...positions.jobTitle, elementId: 'jobTitle', type: 'container' },
    { name: 'تسمية المسمى', ...positions.jobTitleLabel, elementId: 'jobTitleLabel', type: 'text' },
    { name: 'قيمة المسمى', ...positions.jobTitleValue, elementId: 'jobTitleValue', type: 'text' },
    { name: 'صندوق المستوى', ...positions.levelBox, elementId: 'levelBox', type: 'container' },
    { name: 'صندوق الفريق', ...positions.teamBox, elementId: 'teamBox', type: 'container' },
    { name: 'صندوق المدينة', ...positions.cityBox, elementId: 'cityBox', type: 'container' },
    { name: 'عنوان التوقعات', ...positions.expectations, elementId: 'expectations', type: 'text' },
    { name: 'نص المسؤوليات', ...positions.responsibilities, elementId: 'responsibilities', type: 'text' }
  ];

  const downloadPDF = () => {
    if (!documentRef.current) return;
    
    setIsDownloading(true);
    
    try {
      const wasDimensionsShown = showDimensions;
      const wasAlignmentShown = showAlignmentGuides;
      setShowDimensions(false);
      setShowAlignmentGuides(false);
      
      const wasEditMode = editMode;
      setEditMode(false);
      
      setTimeout(() => {
        window.print();
        
        if (wasDimensionsShown) setShowDimensions(true);
        if (wasAlignmentShown) setShowAlignmentGuides(true);
        if (wasEditMode) setEditMode(true);
        setIsDownloading(false);
      }, 100);
      
    } catch (error) {
      console.error('Error triggering print:', error);
      alert('حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.');
      setIsDownloading(false);
    }
  };

  // Handle icon upload
  const handleIconUpload = (e, iconId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedIcons(prev => ({
          ...prev,
          [iconId]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle font upload
  const handleFontUpload = (e, fontType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fontFace = new FontFace(`CustomFont-${fontType}`, `url(${event.target.result})`);
        fontFace.load().then((loadedFont) => {
          document.fonts.add(loadedFont);
          setCustomFonts(prev => ({
            ...prev,
            [fontType]: `CustomFont-${fontType}`
          }));
        }).catch((error) => {
          console.error('Font loading error:', error);
          alert('فشل تحميل الخط. تأكد من أن الملف صحيح.');
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Alignment guide lines
  const AlignmentGuides = () => {
    if (!showAlignmentGuides) return null;
    
    const guides = [
      // Vertical guides
      { type: 'vertical', pos: 37, color: '#FF0000' },
      { type: 'vertical', pos: 101, color: '#00FF00' },
      { type: 'vertical', pos: 203, color: '#0000FF' },
      { type: 'vertical', pos: 297.5, color: '#FFFF00' }, // Center
      { type: 'vertical', pos: 374.5, color: '#FF00FF' },
      { type: 'vertical', pos: 547, color: '#00FFFF' },
      // Horizontal guides
      { type: 'horizontal', pos: 83, color: '#FF0000' },
      { type: 'horizontal', pos: 138, color: '#00FF00' },
      { type: 'horizontal', pos: 204, color: '#0000FF' },
      { type: 'horizontal', pos: 278, color: '#FFFF00' },
      { type: 'horizontal', pos: 352, color: '#FF00FF' },
      { type: 'horizontal', pos: 421, color: '#FFFF00' }, // Center
      { type: 'horizontal', pos: 455, color: '#00FFFF' },
      { type: 'horizontal', pos: 509, color: '#FFA500' },
    ];

    return (
      <>
        {guides.map((guide, idx) => (
          guide.type === 'vertical' ? (
            <div
              key={idx}
              className="absolute h-full w-px pointer-events-none z-40"
              style={{
                left: `${guide.pos}px`,
                top: 0,
                backgroundColor: guide.color,
                opacity: 0.3
              }}
            />
          ) : (
            <div
              key={idx}
              className="absolute w-full h-px pointer-events-none z-40"
              style={{
                top: `${guide.pos}px`,
                left: 0,
                backgroundColor: guide.color,
                opacity: 0.3
              }}
            />
          )
        ))}
      </>
    );
  };

  // Enhanced dimension overlay
  const DimensionOverlay = ({ comp }) => {
    if (!showDimensions) return null;
    
    return (
      <div
        className="absolute border-2 border-red-500 border-dashed pointer-events-none z-50"
        style={{
          left: `${comp.left}px`,
          top: `${comp.top}px`,
          width: `${comp.width}px`,
          height: `${comp.height}px`,
        }}
      >
        <div 
          className="absolute -top-7 right-0 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded whitespace-nowrap font-mono"
          style={{ direction: 'ltr' }}
        >
          {comp.name} | {comp.width}×{comp.height} | X:{Math.round(comp.left)} Y:{Math.round(comp.top)}
        </div>
      </div>
    );
  };

  // Improved Draggable Element Component
  const DraggableElement = ({ elementId, children, className = '', style = {} }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const elementRef = useRef(null);

    const handleMouseDown = (e) => {
      if (!editMode) return;
      e.preventDefault();
      e.stopPropagation();
      
      setIsDragging(true);
      setSelectedElement(elementId);
      
      const rect = documentRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left - positions[elementId].left,
        y: e.clientY - rect.top - positions[elementId].top
      });
    };

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e) => {
        if (!documentRef.current) return;
        
        const rect = documentRef.current.getBoundingClientRect();
        let newLeft = e.clientX - rect.left - dragStart.x;
        let newTop = e.clientY - rect.top - dragStart.y;
        
        // Keep within bounds
        newLeft = Math.max(0, Math.min(595 - (positions[elementId].width || 100), newLeft));
        newTop = Math.max(0, Math.min(842 - (positions[elementId].height || 30), newTop));
        
        setPositions(prev => ({
          ...prev,
          [elementId]: {
            ...prev[elementId],
            left: newLeft,
            top: newTop
          }
        }));
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, dragStart, elementId]);

    const isSelected = selectedElement === elementId;

    return (
      <div
        ref={elementRef}
        onMouseDown={handleMouseDown}
        className={`${className} ${editMode ? 'cursor-move' : ''} ${
          isSelected && editMode ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
        } ${isDragging ? 'z-50 opacity-80' : ''}`}
        style={{
          position: 'absolute',
          left: `${positions[elementId].left}px`,
          top: `${positions[elementId].top}px`,
          userSelect: 'none',
          ...style
        }}
      >
        {children}
        {editMode && (
          <div 
            className="absolute -top-6 -left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap"
            style={{ direction: 'rtl' }}
          >
            ⋮⋮ {elementId}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-8 p-8 bg-gray-100 min-h-screen" dir="rtl">
      {/* Control Panel */}
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-2 no-print">
        <button
          onClick={() => setShowDimensions(!showDimensions)}
          className={`px-4 py-2 rounded shadow-lg font-medium transition-colors text-sm ${
            showDimensions 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
          }`}
        >
          {showDimensions ? '✓ الأبعاد' : '📏 إظهار الأبعاد'}
        </button>
        <button
          onClick={() => setShowAlignmentGuides(!showAlignmentGuides)}
          className={`px-4 py-2 rounded shadow-lg font-medium transition-colors text-sm ${
            showAlignmentGuides 
              ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
          }`}
        >
          {showAlignmentGuides ? '✓ خطوط المحاذاة' : '📐 خطوط المحاذاة'}
        </button>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-4 py-2 rounded shadow-lg font-medium transition-colors text-sm ${
            editMode 
              ? 'bg-purple-500 text-white hover:bg-purple-600' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
          }`}
        >
          {editMode ? '✓ وضع التعديل' : '✏️ تفعيل التعديل'}
        </button>
        <button
          onClick={downloadPDF}
          disabled={isDownloading}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 disabled:bg-gray-400 font-medium transition-colors text-sm"
        >
          {isDownloading ? 'جاري...' : '🖨️ طباعة PDF'}
        </button>
      </div>

      {/* Document Preview */}
      <div className="flex-shrink-0 relative">
        <div 
          ref={documentRef} 
          className="w-[595px] h-[842px] relative bg-[#F2EEE4] overflow-hidden shadow-2xl"
          style={{ direction: 'rtl' }}
        >
          {/* Alignment Guides */}
          <AlignmentGuides />
          
          {/* Top accent bar */}
          <div className="absolute w-[661.48px] h-[27.65px] -left-[18.28px] -top-[13.11px] opacity-89" style={{ backgroundColor: formData.accentColor }} />
          
          {/* Black accent element */}
          <div className="absolute w-8 h-9 left-10 top-[766px] bg-black" />

          {/* Greeting Section */}
          <DraggableElement elementId="greeting">
            <div className="flex items-center gap-2.5" dir="rtl">
              <div className="text-[32px] leading-[21px] relative group">
                {uploadedIcons.greeting ? (
                  <img src={uploadedIcons.greeting} alt="icon" className="w-8 h-8 object-contain" />
                ) : (
                  formData.greetingIcon
                )}
                {editMode && (
                  <label className="absolute -top-10 -right-10 bg-green-500 text-white text-[9px] px-2 py-1 rounded cursor-pointer hover:bg-green-600 whitespace-nowrap z-50">
                    📁 رفع أيقونة
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleIconUpload(e, 'greeting')}
                    />
                  </label>
                )}
              </div>
              <div 
                className="text-black text-[32px] font-[900] leading-[21px] tracking-[1.06px]" 
                style={{ fontFamily: customFonts.display || 'Thmanyah serif display 1.2, serif', direction: 'rtl' }}
              >
                أهـلاً {formData.candidateName}
              </div>
            </div>
          </DraggableElement>

          {/* Introduction Text */}
          <DraggableElement elementId="intro">
            <div 
              className="w-[499px] text-right text-black text-sm leading-[21px] tracking-[0.05px]" 
              style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif', direction: 'rtl' }}
            >
              نتمنى أن تكون معنا في سعينا لإثراء المحتوى العربي وتغيير ثقافة الصحافة في الوطن العربي. يسعدنا العمل معك على النحو التالي:
            </div>
          </DraggableElement>

          {/* Job Title Box */}
          <DraggableElement elementId="jobTitle">
            <div className="w-[510px] h-[65px] bg-[#3BC17B] rounded-2xl flex flex-col items-center justify-center" dir="rtl">
              <div 
                className="text-black text-sm leading-[21px] tracking-[0.44px]" 
                style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}
              >
                المسمّى الوظيفي
              </div>
              <div 
                className="text-black text-sm font-bold leading-[21px] tracking-[0.44px] text-center" 
                style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}
              >
                {formData.jobTitle}
              </div>
            </div>
          </DraggableElement>

          {/* Level Box */}
          <DraggableElement elementId="levelBox">
            <div className="w-[160px] h-[143px] bg-[#ABD9AB] rounded-2xl p-2" dir="rtl">
              <div className="text-black text-xs font-light leading-[21px] tracking-[0.38px] text-center mb-1" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>
                المستوى
              </div>
              {levels.map((level, idx) => (
                <div key={idx} className="flex items-center justify-between mb-0.5" dir="ltr">
                  <div className={`text-xs ${formData.level === level.ar ? 'text-black font-bold' : 'text-[#315545] font-light'}`} style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>
                    {level.en}
                  </div>
                  <div className={`text-[10px] text-center flex-shrink-0 w-5 ${formData.level === level.ar ? 'text-black font-bold' : 'text-[#315545] font-light'}`} style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>
                    {level.num}
                  </div>
                  <div className={`text-xs text-right ${formData.level === level.ar ? 'text-black font-bold' : 'text-[#315545] font-light'}`} style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif', direction: 'rtl' }}>
                    {level.ar}
                  </div>
                </div>
              ))}
            </div>
          </DraggableElement>

          {/* Team/Department/Management Box */}
          <DraggableElement elementId="teamBox">
            <div className="w-[344px] h-[69px] bg-[#ABD9AB] rounded-2xl flex items-center justify-center gap-4 px-4" dir="rtl">
              <div className="flex flex-col items-center">
                <div className="text-black text-xs font-light leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>الإدارة</div>
                <div className="text-black text-xs font-bold leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>{formData.management}</div>
              </div>
              <div className="w-[42px] h-px bg-black rotate-90" />
              <div className="flex flex-col items-center">
                <div className="text-black text-xs font-light leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>القسم</div>
                <div className="text-black text-xs font-bold leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>{formData.department}</div>
              </div>
              <div className="w-[42px] h-px bg-black rotate-90" />
              <div className="flex flex-col items-center">
                <div className="text-black text-xs font-light leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>الفريق</div>
                <div className="text-black text-xs font-bold leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>{formData.team}</div>
              </div>
            </div>
          </DraggableElement>

          {/* City/Work Type/Manager Box */}
          <DraggableElement elementId="cityBox">
            <div className="w-[344px] h-[69px] bg-[#ABD9AB] rounded-2xl flex items-center justify-center gap-4 px-4" dir="rtl">
              <div className="flex flex-col items-center min-w-[94px]">
                <div className="text-black text-xs font-light leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>المدير المباشر</div>
                <div className="text-black text-xs font-bold leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>{formData.directManager}</div>
              </div>
              <div className="w-[42px] h-px bg-black rotate-90" />
              <div className="flex flex-col items-center min-w-[66px]">
                <div className="text-black text-xs font-light leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>نوع الدوام</div>
                <div className="text-black text-xs font-bold leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>{formData.workType}</div>
              </div>
              <div className="w-[42px] h-px bg-black rotate-90" />
              <div className="flex flex-col items-center min-w-[92px]">
                <div className="text-black text-xs font-light leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>مدينة التعاقد</div>
                <div className="text-black text-xs font-bold leading-[21px] tracking-[0.38px] text-center" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif' }}>{formData.contractCity}</div>
              </div>
            </div>
          </DraggableElement>

          {/* Expectations Header */}
          <DraggableElement elementId="expectations">
            <div className="text-right text-black text-2xl font-[900] tracking-[0.79px]" style={{ fontFamily: customFonts.display || 'Thmanyah serif display 1.2, serif', direction: 'rtl' }}>
              في هذه الوظيفة نتوقع منك التالي:
            </div>
          </DraggableElement>

          {/* Responsibilities */}
          <DraggableElement elementId="responsibilities">
            <div className="text-right text-black text-xs font-light leading-[21px] tracking-[0.38px] max-w-[446px]" style={{ fontFamily: customFonts.sans || 'Thmanyah sans 1.2, sans-serif', direction: 'rtl' }}>
              {formData.responsibilities.map((resp, idx) => (
                <React.Fragment key={idx}>
                  {resp}
                  {idx < formData.responsibilities.length - 1 && <><br/></>}
                </React.Fragment>
              ))}
            </div>
          </DraggableElement>
          
          {/* Dimension Overlays */}
          {getComponents().map((comp, idx) => (
            <DimensionOverlay key={idx} comp={comp} />
          ))}
        </div>
      </div>

      {/* Editable Form */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg max-w-md h-fit no-print">
        <h2 className="text-2xl font-bold mb-6 text-right">تعديل البيانات</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-right">اسم المرشح</label>
            <input
              type="text"
              value={formData.candidateName}
              onChange={(e) => setFormData({...formData, candidateName: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-right">المسمى الوظيفي</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-right">المستوى</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            >
              {levels.map((level) => (
                <option key={level.num} value={level.ar}>{level.ar}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-right">الفريق</label>
            <input
              type="text"
              value={formData.team}
              onChange={(e) => setFormData({...formData, team: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-right">القسم</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-right">الإدارة</label>
            <input
              type="text"
              value={formData.management}
              onChange={(e) => setFormData({...formData, management: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-right">مدينة التعاقد</label>
            <input
              type="text"
              value={formData.contractCity}
              onChange={(e) => setFormData({...formData, contractCity: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-right">نوع الدوام</label>
            <select
              value={formData.workType}
              onChange={(e) => setFormData({...formData, workType: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            >
              <option value="كامل">كامل</option>
              <option value="جزئي">جزئي</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-right">المدير المباشر</label>
            <input
              type="text"
              value={formData.directManager}
              onChange={(e) => setFormData({...formData, directManager: e.target.value})}
              className="w-full px-3 py-2 border rounded text-right"
              dir="rtl"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-bold mb-3 text-right">الخطوط المخصصة</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-right">خط Sans (النصوص العادية)</label>
                <input
                  type="file"
                  accept=".woff,.woff2,.ttf,.otf"
                  onChange={(e) => handleFontUpload(e, 'sans')}
                  className="w-full px-3 py-2 border rounded text-sm"
                  dir="rtl"
                />
                {customFonts.sans && <p className="text-xs text-green-600 mt-1 text-right">✓ تم التحميل</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-right">خط Serif (العناوين)</label>
                <input
                  type="file"
                  accept=".woff,.woff2,.ttf,.otf"
                  onChange={(e) => handleFontUpload(e, 'serif')}
                  className="w-full px-3 py-2 border rounded text-sm"
                  dir="rtl"
                />
                {customFonts.serif && <p className="text-xs text-green-600 mt-1 text-right">✓ تم التحميل</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-right">خط Display (الترحيب)</label>
                <input
                  type="file"
                  accept=".woff,.woff2,.ttf,.otf"
                  onChange={(e) => handleFontUpload(e, 'display')}
                  className="w-full px-3 py-2 border rounded text-sm"
                  dir="rtl"
                />
                {customFonts.display && <p className="text-xs text-green-600 mt-1 text-right">✓ تم التحميل</p>}
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-bold mb-3 text-right">التصميم والأيقونات</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-right">أيقونة الترحيب</label>
              <input
                type="text"
                value={formData.greetingIcon}
                onChange={(e) => setFormData({...formData, greetingIcon: e.target.value})}
                className="w-full px-3 py-2 border rounded text-center text-2xl"
                placeholder="👋🏻"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                يمكنك استخدام إيموجي أو أيقونة من <a href="https://emojipedia.org" target="_blank" rel="noreferrer" className="text-blue-500 underline">Emojipedia</a>
              </p>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium mb-1 text-right">لون الشريط العلوي</label>
              <div className="flex gap-2 items-center" dir="ltr">
                <input
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                  className="w-16 h-10 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder="#03BB6E"
                />
              </div>
            </div>
          </div>

          {editMode && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-bold mb-3 text-right">
                التحكم الدقيق في المواضع 
                {selectedElement && <span className="text-sm text-blue-600"> ({selectedElement})</span>}
              </h3>
              <div className="space-y-2 text-sm max-h-96 overflow-y-auto">
                {Object.keys(positions).map((key) => (
                  <div key={key} className={`flex items-center gap-2 p-2 rounded ${selectedElement === key ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50'}`} dir="rtl">
                    <label className="w-32 text-right font-medium text-xs">{key}</label>
                    <div className="flex gap-2 flex-1">
                      <input
                        type="number"
                        value={Math.round(positions[key].left)}
                        onChange={(e) => setPositions({...positions, [key]: {...positions[key], left: Number(e.target.value)}})}
                        className="w-20 px-2 py-1 border rounded text-center text-xs"
                        placeholder="X"
                      />
                      <input
                        type="number"
                        value={Math.round(positions[key].top)}
                        onChange={(e) => setPositions({...positions, [key]: {...positions[key], top: Number(e.target.value)}})}
                        className="w-20 px-2 py-1 border rounded text-center text-xs"
                        placeholder="Y"
                      />
                      <button
                        onClick={() => setSelectedElement(key)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        تحديد
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOfferDocument;

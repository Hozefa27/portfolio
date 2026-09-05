"""
Generate 3 clean, valid PDF resumes for Hozefa Lightwala using pure Python standard library.
Produces real PDF 1.4 files that open in any PDF viewer or browser.
"""
import os

def create_simple_pdf(filename, role_title, summary, skills, experience, education, contact_info):
    lines = []
    lines.append(f"HOZEFA LIGHTWALA")
    lines.append(f"{role_title.upper()}")
    lines.append(f"Location: Mumbai, India | Email: {contact_info['email']} | Phone: {contact_info['phone']}")
    lines.append(f"LinkedIn: {contact_info['linkedin']} | GitHub: {contact_info['github']}")
    lines.append("-" * 75)
    lines.append("")
    lines.append("PROFESSIONAL SUMMARY")
    lines.append(summary)
    lines.append("")
    lines.append("CORE SKILLS & TECHNOLOGIES")
    for s in skills:
        lines.append(f"  * {s}")
    lines.append("")
    lines.append("WORK EXPERIENCE")
    for exp in experience:
        lines.append(f"  * {exp['role']} - {exp['company']} ({exp['period']})")
        lines.append(f"    {exp['desc']}")
    lines.append("")
    lines.append("EDUCATION")
    for edu in education:
        lines.append(f"  * {edu['degree']} - {edu['inst']} ({edu['score']})")
    lines.append("")
    lines.append("INTERESTS & LEADERSHIP")
    lines.append("  * Automation Architecture, Technical Writing, Literature, Cricket")
    lines.append("-" * 75)

    # Build PDF streams
    # Standard PDF 1.4 stream formatting
    content_stream = []
    content_stream.append("BT")
    content_stream.append("/F1 18 Tf")
    content_stream.append("50 780 Td")
    content_stream.append(f"({escape_pdf(lines[0])}) Tj")
    content_stream.append("/F2 12 Tf")
    content_stream.append("0 -22 Td")
    content_stream.append(f"({escape_pdf(lines[1])}) Tj")
    content_stream.append("/F1 9 Tf")
    content_stream.append("0 -16 Td")
    content_stream.append(f"({escape_pdf(lines[2])}) Tj")
    content_stream.append("0 -14 Td")
    content_stream.append(f"({escape_pdf(lines[3])}) Tj")
    content_stream.append("0 -12 Td")
    content_stream.append(f"({escape_pdf(lines[4])}) Tj")

    y_offset = -18
    for line in lines[5:]:
        if not line.strip():
            content_stream.append("0 -10 Td")
            continue
        if line.startswith("PROFESSIONAL") or line.startswith("CORE SKILLS") or line.startswith("WORK EXPERIENCE") or line.startswith("EDUCATION") or line.startswith("INTERESTS"):
            content_stream.append("/F2 11 Tf")
            content_stream.append(f"0 -16 Td ({escape_pdf(line)}) Tj")
            content_stream.append("/F1 9 Tf")
        else:
            content_stream.append(f"0 -13 Td ({escape_pdf(line)}) Tj")

    content_stream.append("ET")
    stream_data = "\n".join(content_stream).encode('latin-1')

    # Construct PDF Objects
    objects = []
    # 1: Catalog
    objects.append("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    # 2: Pages
    objects.append("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
    # 3: Page
    objects.append("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n")
    # 4: Contents
    objects.append(f"4 0 obj\n<< /Length {len(stream_data)} >>\nstream\n".encode('latin-1') + stream_data + b"\nendstream\nendobj\n")
    # 5: Font F1 (Helvetica)
    objects.append("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")
    # 6: Font F2 (Helvetica-Bold)
    objects.append("6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n")

    # Assemble PDF
    output = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    xref_offsets = [0]
    for obj in objects:
        xref_offsets.append(len(output))
        if isinstance(obj, str):
            output.extend(obj.encode('latin-1'))
        else:
            output.extend(obj)

    xref_start = len(output)
    output.extend(f"xref\n0 {len(xref_offsets)}\n0000000000 65535 f \n".encode('latin-1'))
    for off in xref_offsets[1:]:
        output.extend(f"{off:010d} 00000 n \n".encode('latin-1'))

    output.extend(f"trailer\n<< /Size {len(xref_offsets)} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode('latin-1'))

    with open(filename, 'wb') as f:
        f.write(output)
    print(f"Created valid PDF: {filename} ({len(output)} bytes)")

def escape_pdf(text):
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

contact = {
    'email': 'hozefalightwala27@gmail.com',
    'phone': '+91 8850302165',
    'linkedin': 'linkedin.com/in/hozefalightwala27',
    'github': 'github.com/Hozefa27'
}

edu = [
    {'degree': 'B.E. in Information Technology', 'inst': 'Mumbai University', 'score': '8.2 CGPA (2016-2020)'},
    {'degree': 'HSC (12th Science)', 'inst': 'Jai Hind College', 'score': '72% (2016)'},
    {'degree': 'SSC (10th Standard)', 'inst': 'Saifi High School', 'score': '86% (2014)'}
]

roles_data = [
    {
        'file': 'python_developer.pdf',
        'title': 'Python Developer & Automation Specialist',
        'summary': 'Passionate Python Developer and Tech Leader specializing in building robust backend architectures, scalable automated workflows, and microservices at enterprise scale.',
        'skills': [
            'Python 3.x, FastAPI, Django, Flask, REST APIs, Microservices Architecture',
            'Automation Pipelines, Scripting, Celery, Task Schedulers, CI/CD',
            'SQL (PostgreSQL, MySQL), Redis, ORMs, Database Optimization',
            'Docker, Linux Systems Administration, Git, Testing & Security'
        ],
        'exp': [
            {'role': 'Software Engineer', 'company': 'Tata Consultancy Services (TCS)', 'period': '2020 - Present', 'desc': 'Architecting automated data and validation pipelines, reducing manual review hours by over 80%.'},
            {'role': 'Research Intern', 'company': 'Tata Institute of Fundamental Research (TIFR)', 'period': '2019', 'desc': 'Implemented Python data processing workflows for scientific research datasets.'}
        ]
    },
    {
        'file': 'ai_ml_engineer.pdf',
        'title': 'AI / ML Engineer & Intelligent Systems Specialist',
        'summary': 'AI/ML Engineer driven to transform enterprise problems into intelligent autonomous solutions. Deep expertise in machine learning lifecycle, NLP, and model operationalization.',
        'skills': [
            'Machine Learning, Deep Learning, NLP (spaCy, Transformers, HuggingFace)',
            'Frameworks: PyTorch, TensorFlow, Scikit-Learn, Pandas, NumPy',
            'LLM Orchestration, Prompt Engineering, Agentic AI Systems, RAG Pipelines',
            'Model Serving: FastAPI, Docker, MLflow, Experiment Tracking, Vector Databases'
        ],
        'exp': [
            {'role': 'AI/ML & Automation Engineer', 'company': 'Tata Consultancy Services (TCS)', 'period': '2020 - Present', 'desc': 'Developing ML-driven anomaly detection and intelligent document processing systems.'},
            {'role': 'Research Intern', 'company': 'Tata Institute of Fundamental Research (TIFR)', 'period': '2019', 'desc': 'Researched algorithmic analysis and statistical computational models.'}
        ]
    },
    {
        'file': 'data_science.pdf',
        'title': 'Data Science & Analytics Specialist',
        'summary': 'Data Scientist experienced in exploratory data analysis, statistical modeling, end-to-end analytical pipelines, and converting complex enterprise data into strategic decisions.',
        'skills': [
            'Data Wrangling & Analysis: Pandas, NumPy, SciPy, Jupyter Notebooks',
            'Statistical Modeling, Hypothesis Testing, Predictive Analytics, Forecasting',
            'Data Visualization: Matplotlib, Seaborn, Plotly, Dashboarding, Power BI',
            'Big Data & Querying: Advanced SQL, ETL Pipelines, Feature Engineering'
        ],
        'exp': [
            {'role': 'Data & Automation Engineer', 'company': 'Tata Consultancy Services (TCS)', 'period': '2020 - Present', 'desc': 'Engineered real-time telemetry dashboards and analytical data pipelines.'},
            {'role': 'Research Intern', 'company': 'Tata Institute of Fundamental Research (TIFR)', 'period': '2019', 'desc': 'Handled large-scale statistical validation and dataset extraction.'}
        ]
    }
]

dirs = ['c:/hozefa/website/public/resume', 'c:/hozefa/website/resume']
for d in dirs:
    os.makedirs(d, exist_ok=True)
    for r in roles_data:
        target = os.path.join(d, r['file'])
        create_simple_pdf(target, r['title'], r['summary'], r['skills'], r['exp'], edu, contact)

print("All 3 resumes successfully generated!")

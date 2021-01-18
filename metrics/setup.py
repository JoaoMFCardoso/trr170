import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="TRR-170-Metrics-JoaoMFCardoso", # Replace with your own username
    version="0.0.1",
    author="Jo�o Cardoso",
    author_email="joao.cardoso.geral@gmail.com",
    description="A operations collection package for the TRR-170 Dataverse",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: GNU GPLv3",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
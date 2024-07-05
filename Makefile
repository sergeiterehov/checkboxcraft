build:
	docker build -t sergeiterehov/checkboxcraft .

build_linux:
	docker build --platform linux/amd64 -t sergeiterehov/checkboxcraft .

run:
	docker run --rm --name checkboxcraft -p 443:443 -p 80:80 -v /var/checkboxcraft:/var/checkboxcraft -d sergeiterehov/checkboxcraft

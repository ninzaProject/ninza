FROM ruby:2.7.1-alpine3.12
RUN apk add --update --no-cache \
        bash \
        build-base \
        nodejs \
        postgresql-dev \
        postgresql-client \
        libxslt-dev \
        libxml2-dev \
        tzdata \
        yarn    

RUN mkdir /myapp
WORKDIR /myapp

# Setup Gem Module
ENV BUNDLER_VERSION=2.1.4
RUN gem update --system
RUN gem install --default bundler -v 2.1.4
COPY ./myapp/Gemfile ./myapp/Gemfile.lock ./
RUN bundle install

# Setup Node Module
ENV RAILS_ENV development
COPY ./myapp/package.json ./myapp/yarn.lock ./

# Copy Apllication Source
COPY ./myapp .

# Setup Entrypoint
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]

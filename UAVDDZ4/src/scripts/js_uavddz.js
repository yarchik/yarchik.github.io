let front = {
    nav: $('.navbar'),
    header_drop: $('.header-drop'),
    slider_options_default: {
        wrapAround: true,
        pageDots: false,
        prevNextButtons: true,
        autoPlay: false,
        cellAlign: 'left',
        contain: true
    },

    init: function () {
        this.events();
        this.headerScroll();
    },

    newSlider: function (selector, options) {
        options = (options !== undefined) ? Object.assign({}, this.slider_options_default, options) : this.slider_options_default;
        return new Flickity(selector, options);
    },

    headerScroll: function () {
        if ($(window).scrollTop() > 5) {
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
    },
    toggleFilter: function () {
        if (!this.btnFilter.hasClass('open')) {
            this.btnFilter.addClass("active");
            this.wrapFilter.toggleClass('open');
        } else {
            this.btnFilter.removeClass("active");
            this.wrapFilter.toggleClass('open');
        }
    },


    openTab: function (element, tabName, parent) {
        let i, tab_content, tab_links;

        tab_content = $(element).closest(parent).find('.tab-content');

        for (i = 0; i < tab_content.length; i++) {
            tab_content[i].style.display = "none";
        }

        tab_links = $(element).closest('.tabs-ul').find('.tab-links');

        for (i = 0; i < tab_links.length; i++) {

            tab_links[i].parentNode.classList.remove('current')
        }

        document.getElementById(tabName).style.display = "block";
        console.log($(element));
        $(element).parent().addClass('current');
    },

    formElements: function (e) {

        $(e).find('.form-control').each(function () {
            $(this).find('input, textarea').on('focus', function () {
                $(this).parent('.form-control').addClass('form-control--focused')
            });

            $(this).find('.form-control').on('blur', function () {
                if ($(this).val() === "") {
                    $(this).parent('.form-control').removeClass('form-control--focused')
                }
            });
        });

        $(e).find('.form-control__input,.form-control__area').each(function () {
            if ($(this).val() != "") {
                $(this).parent('.form-control').addClass('form-control--focused')
            }
        });
    },


    events: function () {
        let self = this;
        $(window).on('scroll', function () {
            self.headerScroll();
        });
    }
};

let modal = {
    closeButton: $('.modal-content__close'),
    closeOverlay: $('.modal'),
    can: 1,
    init: function () {
        this.events();
    },
    openModal: function (id) {
        let modalWindow = $(id);
        modalWindow.fadeIn();
        modalWindow.find('.modal-content').removeClass('animate-away').addClass('animate-in');
        $(id).addClass('open');
       // $("html").addClass("overflow-hidden");

    },

    closeModal: function (id) {
        let modalWindow = $(id);
        modalWindow.find('.modal__content').removeClass('animate-in').addClass('animate-away');
        modalWindow.fadeOut();
       //$('body').removeClass('overflow-hidden');
    },

    events: function () {

        $(document).on('click', '.modalTrigger', function (e) {
            e.preventDefault();
            let self = $(this),
                target = self.attr('data-modal');
            modal.openModal(target);

            if (target = 'book-room') {
                $('.header-btn').addClass('d-none');
                $('.modal-btn').addClass('d-block');
                $('.header-right').removeClass('d-lg-block');
            }

        });

        $(document).on('click', '.modal', function (event) {

            let self = '#' + $(this).attr('id');

      
            modal.closeModal(self);
            if (event.target.className == 'modal-body') {

            }
        });

        $(document).on('click', '.modal-content__close', function () {

            let self = '#' + $(this).closest('.modal').attr('id');
            modal.closeModal(self);
        });
    }
};

jQuery(function () {
    front.init();
    modal.init();
    front.formElements(document);

   /* $(".burger").on("click", function () {
        $(this).toggleClass("active"),
            $(".header-navbar").toggleClass("open-menu")
        $('.js-header').toggleClass('active')
    })*/
    $(".hamburger").on("click", function () {

        $(this).toggleClass("active"),
            $(".header-navbar").toggleClass("open-menu")

    })
    $(".btn-search").on("click", function () {
        $("body").toggleClass("bg"),
        $(this).toggleClass("active"),
            $(".search-form__block").toggleClass("visible")

    })


});

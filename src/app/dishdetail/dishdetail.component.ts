import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author is required.',
      'minlength': 'Author must be at least 2 characters long.',
      'maxlength': 'Author cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  dishComment: Comment;
  errorMessage: string;
  @ViewChild('cform') commentFormDirective;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    @Inject('baseURL') private BaseURL) { }

  ngOnInit() {
    this.createForms();
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errorMessage => this.errorMessage = errorMessage);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForms() {
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: '5',
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.dishComment = this.commentForm.value as Comment;
    this.dishComment.date = new Date().toISOString();
    this.dish.comments.push(this.dishComment);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: '5',
      comment: ''
    });
  }
}

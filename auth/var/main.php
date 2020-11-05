<section class="main">
  <div class="wrapper">
    <header class="head">
      <h1 class="head__hi">Привет, <?=$user['_log']?>!</h1>
      <a id="logout" class="head__out" href="javascript:void(0);">Выход</a>
      <form name="logout" action="/auth/signout.php" method="POST" style="display:none;">
        <input name="logout" type="hidden" value="Выход">
      </form>
    </header>
    <ul class="list main__list">
      <li class="list__unit">
        <a href="/?goo" target="_blank" class="list__link">
          <div class="list__img img1"></div>
          <div class="list__desc">
            <h2 class="list__name">Reader 1</h2>
            <p class="list__text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam sit odio distinctio harum ab laboriosam error earum qui, necessitatibus dicta non libero labore quia molestias a, illo quaerat eius neque?
            Dolores animi tempore quos beatae, ad sunt saepe id tenetur earum eligendi sapiente corporis vero ipsam! Debitis architecto necessitatibus fugiat vel odit impedit possimus libero quidem totam, suscipit, sit molestias?
            Vitae placeat suscipit magni in inventore ipsum quam culpa blanditiis cupiditate? Facere dicta, id illum enim dolore perferendis in officia at! Quisquam eum repellendus ex. Repudiandae optio unde quibusdam sit?</p>
          </div>
        </a>
      </li>
      <li class="list__unit">
        <a href="/?goo" target="_blank" class="list__link">
          <div class="list__img img2"></div>
          <div class="list__desc">
            <h2 class="list__name">Reader 2</h2>
            <p class="list__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit repellat quibusdam deleniti sit ratione maiores accusantium veritatis? Veritatis architecto ratione ea sunt voluptas accusamus autem quod tenetur nemo omnis iure modi numquam ullam qui dolore assumenda tempora excepturi eos nihil, odio repellat quisquam repudiandae!</p>
          </div>
        </a>
      </li>
      <li class="list__unit">
        <a href="/?goo" target="_blank" class="list__link">
          <div class="list__img img3"></div>
          <div class="list__desc">
            <h2 class="list__name">Reader 3</h2>
            <p class="list__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio repellat, totam, temporibus architecto, exercitationem nesciunt similique rem nemo sed dolor quaerat? Doloribus tempora dolore similique ut voluptas repellendus. Repudiandae, asperiores?Expedita non, animi quo possimus incidunt, omnis inventore deleniti aspernatur unde corporis minima earum? Laboriosam expedita saepe consequuntur ipsum nesciunt architecto ab vel! Eligendi modi harum ex deserunt nemo blanditiis.</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</section>
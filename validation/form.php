<style type="text/css">
<?php include '/../css/honey.css'; ?>
</style>



<?php if (isset($message)) : ?>
    <div class="alert alert-success">
        <?= $message ?>
    </div>
<?php endif ?>
          
<form action="index.php" method="get">
            <div class="mb-4">
              <input type="text" value="<?= $inputs['name'] ?? '' ?>"  class="form-control" name="name" id="name" placeholder="Your Name:"
              autocomplete="off">
              <small><?= $errors['name'] ?? '' ?></small>
            </div>
            <div class="mb-4">
              <input type="number" class="form-control" name="number" id="number" value="<?= $inputs['number'] ?? '' ?>"  placeholder="Phone No. :"
              autocomplete="off">
              <small><?= $errors['number'] ?? '' ?></small>
            </div>
            <div class="mb-4">
              <input type="email" class="form-control" name="email" id="email" value="<?= $inputs['email'] ?? '' ?>"  placeholder="Your Email:"
              autocomplete="off">
              <small><?= $errors['email'] ?? '' ?></small>
            </div>
            <div class="mb-4">
              <textarea cols="40" rows="5" class="form-control" name="message" id="message" <?= $inputs['message'] ?? '' ?> 
              placeholder="Write to us:"
              autocomplete="off">
            </textarea>
            <small><?= $errors['message'] ?? '' ?></small>
            </div>
            <label for="nickname" aria-hidden="true" class="user-cannot-see"> Nickname
              <input type="text"  name="nickname" id="nickname"  class="user-cannot-see"  autocomplete="off"  tabindex="-1">
          </label>
            <button type="submit" class="main-btn">Submit</button>
          </form>